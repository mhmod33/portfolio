import { Component, inject, ChangeDetectionStrategy, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { ThemeService } from '../../core/services/theme.service';
import { LanguageService } from '../../core/services/language.service';

interface Point {
  x: number;
  y: number;
  originX: number;
  originY: number;
  closest?: Point[];
  circle?: Circle;
  active?: number;
}

interface Circle {
  pos: Point;
  radius: number;
  color: string;
  active?: number;
  draw: () => void;
}

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit, OnDestroy, AfterViewInit {
  themeService = inject(ThemeService);
  langService = inject(LanguageService);

  // Canvas animation properties
  private width = 0;
  private height = 0;
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private points: Point[] = [];
  private target = { x: 0, y: 0 };
  private animateHeader = true;
  private animationId: number | null = null;

  // Custom cursor properties
  private cursorElement: HTMLElement | null = null;
  private cursorX = 0;
  private cursorY = 0;
  private cursorVisible = false;
  private cursorRafId: number | null = null;

  // Hover selectors for cursor expansion
  private readonly hoverSelectors = 'a, button, .project-card, .social-link-item, .social-btn, .btn-primary, .btn-secondary, .btn-outlined, .submit-btn, .stat-card, input, textarea, select, .nav-link, .tab-item, .timeline-item';

  // Bound event handlers for cleanup
  private boundMouseMove: ((e: MouseEvent) => void) | null = null;
  private boundResize: (() => void) | null = null;
  private boundMouseOver: ((e: Event) => void) | null = null;
  private boundMouseOut: ((e: Event) => void) | null = null;
  private boundMouseEnter: (() => void) | null = null;
  private boundMouseLeave: (() => void) | null = null;

  ngOnInit() {}

  ngAfterViewInit() {
    this.initCanvasAnimation();
    this.initCustomCursor();
  }

  ngOnDestroy() {
    this.cleanupAnimation();
    this.cleanupCursor();
  }

  // ==================== Custom Cursor ====================

  private initCustomCursor() {
    // Only init on non-touch devices
    if ('ontouchstart' in window) return;

    this.cursorElement = document.getElementById('custom-cursor');
    if (!this.cursorElement) return;

    // Track mouse position for cursor
    this.boundMouseEnter = () => {
      this.cursorVisible = true;
      this.cursorElement?.classList.add('visible');
    };

    this.boundMouseLeave = () => {
      this.cursorVisible = false;
      this.cursorElement?.classList.remove('visible');
    };

    this.boundMouseOver = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest(this.hoverSelectors)) {
        this.cursorElement?.classList.add('hovered');
      }
    };

    this.boundMouseOut = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest(this.hoverSelectors)) {
        this.cursorElement?.classList.remove('hovered');
      }
    };

    document.addEventListener('mouseenter', this.boundMouseEnter);
    document.addEventListener('mouseleave', this.boundMouseLeave);
    document.addEventListener('mouseover', this.boundMouseOver);
    document.addEventListener('mouseout', this.boundMouseOut);

    // Start cursor animation loop
    this.animateCursor();
  }

  private animateCursor() {
    if (this.cursorElement) {
      this.cursorElement.style.left = this.cursorX + 'px';
      this.cursorElement.style.top = this.cursorY + 'px';
    }
    this.cursorRafId = requestAnimationFrame(() => this.animateCursor());
  }

  private cleanupCursor() {
    if (this.cursorRafId) {
      cancelAnimationFrame(this.cursorRafId);
    }
    if (this.boundMouseEnter) {
      document.removeEventListener('mouseenter', this.boundMouseEnter);
    }
    if (this.boundMouseLeave) {
      document.removeEventListener('mouseleave', this.boundMouseLeave);
    }
    if (this.boundMouseOver) {
      document.removeEventListener('mouseover', this.boundMouseOver);
    }
    if (this.boundMouseOut) {
      document.removeEventListener('mouseout', this.boundMouseOut);
    }
  }

  // ==================== Canvas Animation ====================

  private initCanvasAnimation() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.target = { x: this.width / 2, y: this.height / 2 };

    this.canvas = document.getElementById('global-demo-canvas') as HTMLCanvasElement;
    if (!this.canvas) return;

    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext('2d');

    if (!this.ctx) return;

    // Create points grid
    this.points = [];
    const stepX = this.width / 18;
    const stepY = this.height / 18;
    for (let x = 0; x < this.width; x = x + stepX) {
      for (let y = 0; y < this.height; y = y + stepY) {
        const px = x + Math.random() * stepX;
        const py = y + Math.random() * stepY;
        const p: Point = { x: px, originX: px, y: py, originY: py };
        this.points.push(p);
      }
    }

    // Find the 5 closest points for each point
    for (let i = 0; i < this.points.length; i++) {
      const closest: Point[] = [];
      const p1 = this.points[i];

      for (let j = 0; j < this.points.length; j++) {
        const p2 = this.points[j];
        if (p1 !== p2) {
          if (closest.length < 5) {
            closest.push(p2);
          } else {
            // Sort by distance to find closest
            let maxDistIndex = 0;
            let maxDist = this.getDistance(p1, closest[0]);
            for (let k = 1; k < closest.length; k++) {
              const d = this.getDistance(p1, closest[k]);
              if (d > maxDist) {
                maxDist = d;
                maxDistIndex = k;
              }
            }
            if (this.getDistance(p1, p2) < maxDist) {
              closest[maxDistIndex] = p2;
            }
          }
        }
      }
      p1.closest = closest;
    }

    // Assign a circle to each point
    const layoutComponent = this;
    for (const point of this.points) {
      const radius = 1 + Math.random() * 1.5;
      point.circle = {
        pos: point,
        radius: radius,
        color: 'var(--accent-color)',
        active: 0,
        draw: function () {
          if (!this.active || !layoutComponent.ctx) return;
          layoutComponent.ctx.beginPath();
          layoutComponent.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
          
          const isDark = layoutComponent.themeService.isDarkMode();
          const r = isDark ? 255 : 0;
          const g = isDark ? 255 : 0;
          const b = isDark ? 255 : 0;
          
          layoutComponent.ctx.fillStyle = `rgba(${r},${g},${b},${this.active * 0.7})`;
          layoutComponent.ctx.fill();
        }
      };
    }

    this.animate();
    for (const point of this.points) {
      this.shiftPoint(point);
    }

    this.addListeners();
  }

  private addListeners() {
    this.boundMouseMove = this.mouseMove.bind(this);
    this.boundResize = this.resize.bind(this);

    if (!('ontouchstart' in window)) {
      window.addEventListener('mousemove', this.boundMouseMove);
    }
    window.addEventListener('resize', this.boundResize);
  }

  private mouseMove(e: MouseEvent) {
    this.target.x = e.clientX;
    this.target.y = e.clientY;

    // Also update custom cursor position
    this.cursorX = e.clientX;
    this.cursorY = e.clientY;
  }

  private resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    if (this.canvas) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }
  }

  private animate() {
    if (this.animateHeader && this.ctx) {
      this.ctx.clearRect(0, 0, this.width, this.height);

      for (const point of this.points) {
        // Detect points in range
        const distance = Math.abs(this.getDistance(this.target, point));

        if (distance < 6000) {
          point.active = 0.25;
          if (point.circle) point.circle.active = 0.5;
        } else if (distance < 30000) {
          point.active = 0.08;
          if (point.circle) point.circle.active = 0.2;
        } else if (distance < 70000) {
          point.active = 0.02;
          if (point.circle) point.circle.active = 0.08;
        } else {
          point.active = 0;
          if (point.circle) point.circle.active = 0;
        }

        this.drawLines(point);
        if (point.circle) point.circle.draw();
      }
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  private shiftPoint(p: Point) {
    const newX = p.originX - 30 + Math.random() * 60;
    const newY = p.originY - 30 + Math.random() * 60;

    const duration = 2000 + Math.random() * 3000;
    const startTime = Date.now();
    const startX = p.x;
    const startY = p.y;

    const animateStep = () => {
      if (!this.animateHeader) return;
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (easeInOut)
      const easeProgress = progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;

      p.x = startX + (newX - startX) * easeProgress;
      p.y = startY + (newY - startY) * easeProgress;

      if (progress < 1) {
        requestAnimationFrame(animateStep);
      } else {
        this.shiftPoint(p);
      }
    };

    animateStep();
  }

  private drawLines(p: Point) {
    if (!p.active || !this.ctx) return;

    const isDark = this.themeService.isDarkMode();
    const r = isDark ? 255 : 0;
    const g = isDark ? 255 : 0;
    const b = isDark ? 255 : 0;

    for (const closestPoint of p.closest || []) {
      this.ctx.beginPath();
      this.ctx.moveTo(p.x, p.y);
      this.ctx.lineTo(closestPoint.x, closestPoint.y);
      this.ctx.strokeStyle = `rgba(${r},${g},${b},${p.active * 0.4})`;
      this.ctx.lineWidth = 0.5;
      this.ctx.stroke();
    }
  }

  private getDistance(p1: Point | { x: number; y: number }, p2: Point | { x: number; y: number }): number {
    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
  }

  private cleanupAnimation() {
    this.animateHeader = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.boundMouseMove) {
      window.removeEventListener('mousemove', this.boundMouseMove);
    }
    if (this.boundResize) {
      window.removeEventListener('resize', this.boundResize);
    }
  }
}
