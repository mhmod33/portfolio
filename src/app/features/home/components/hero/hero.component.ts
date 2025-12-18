import { Component, inject, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../../core/services/language.service';
import { translations } from '../../../../core/utils/translations';
import { portfolioData } from '../../../../core/utils/portfolio-data';
import { RouterLink } from '@angular/router';

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
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, OnDestroy, AfterViewInit {
  langService = inject(LanguageService);
  hero = translations.hero;
  personalInfo = portfolioData.personalInfo;

  // Canvas animation properties
  private width: number = 0;
  private height: number = 0;
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private points: Point[] = [];
  private target = { x: 0, y: 0 };
  private animateHeader = true;
  private animationId: number | null = null;

  // Starfield properties
  private starfield: HTMLElement | null = null;
  private stars: HTMLElement[] = [];
  private starCount: number = 250;

  t(translation: { en: string; ar: string }): string {
    return this.langService.t(translation);
  }

  downloadCV() {
    window.open('/Mahmoud-Sayed-CV.pdf', '_blank');
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.initStarfield();
    this.initCanvasAnimation();
  }

  ngOnDestroy() {
    this.cleanupStars();
    this.cleanupAnimation();
  }

  private initCanvasAnimation() {
    this.initHeader();
    this.initAnimation();
    this.addListeners();
  }

  private initHeader() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.target = { x: this.width / 2, y: this.height / 2 };

    this.canvas = document.getElementById('demo-canvas') as HTMLCanvasElement;
    if (!this.canvas) return;

    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext('2d');

    if (!this.ctx) return;

    // Create points
    this.points = [];
    for (let x = 0; x < this.width; x = x + this.width / 20) {
      for (let y = 0; y < this.height; y = y + this.height / 20) {
        const px = x + Math.random() * this.width / 20;
        const py = y + Math.random() * this.height / 20;
        const p: Point = { x: px, originX: px, y: py, originY: py };
        this.points.push(p);
      }
    }

    // For each point find the 5 closest points
    for (let i = 0; i < this.points.length; i++) {
      const closest: Point[] = [];
      const p1 = this.points[i];
      
      for (let j = 0; j < this.points.length; j++) {
        const p2 = this.points[j];
        if (!(p1 === p2)) {
          let placed = false;
          
          for (let k = 0; k < 5; k++) {
            if (!placed) {
              if (closest[k] === undefined) {
                closest[k] = p2;
                placed = true;
              }
            }
          }

          for (let k = 0; k < 5; k++) {
            if (!placed) {
              if (this.getDistance(p1, p2) < this.getDistance(p1, closest[k]!)) {
                closest[k] = p2;
                placed = true;
              }
            }
          }
        }
      }
      p1.closest = closest;
    }

    // Assign a circle to each point
    const heroComponent = this;
    for (const point of this.points) {
      const radius = 2 + Math.random() * 2;
      const color = 'rgba(156,217,249,0.3)';
      point.circle = {
        pos: point,
        radius: radius,
        color: color,
        active: 0,
        draw: function() {
          if (!this.active || !heroComponent.ctx) return;
          heroComponent.ctx.beginPath();
          heroComponent.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
          heroComponent.ctx.fillStyle = `rgba(156,217,249,${this.active})`;
          heroComponent.ctx.fill();
        }
      };
    }
  }

  private addListeners() {
    if (!('ontouchstart' in window)) {
      window.addEventListener('mousemove', this.mouseMove.bind(this));
    }
    window.addEventListener('scroll', this.scrollCheck.bind(this));
    window.addEventListener('resize', this.resize.bind(this));
  }

  private mouseMove(e: MouseEvent) {
    let posx = 0;
    let posy = 0;
    
    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    
    this.target.x = posx;
    this.target.y = posy;
  }

  private scrollCheck() {
    if (document.body.scrollTop > this.height) {
      this.animateHeader = false;
    } else {
      this.animateHeader = true;
    }
  }

  private resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    
    if (this.canvas) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }

    if (this.starfield) {
      this.createStars();
    }
  }

  private initAnimation() {
    this.animate();
    for (const point of this.points) {
      this.shiftPoint(point);
    }
  }

  private animate() {
    if (this.animateHeader && this.ctx) {
      this.ctx.clearRect(0, 0, this.width, this.height);
      
      for (const point of this.points) {
        // Detect points in range
        const distance = Math.abs(this.getDistance(this.target, point));
        
        if (distance < 4000) {
          point.active = 0.3;
          if (point.circle) point.circle.active = 0.6;
        } else if (distance < 20000) {
          point.active = 0.1;
          if (point.circle) point.circle.active = 0.3;
        } else if (distance < 40000) {
          point.active = 0.02;
          if (point.circle) point.circle.active = 0.1;
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
    const newX = p.originX - 50 + Math.random() * 100;
    const newY = p.originY - 50 + Math.random() * 100;
    
    // Simple animation without TweenLite
    const duration = 1000 + Math.random() * 1000;
    const startTime = Date.now();
    const startX = p.x;
    const startY = p.y;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (easeInOut)
      const easeProgress = progress < 0.5 
        ? 2 * progress * progress 
        : -1 + (4 - 2 * progress) * progress;
      
      p.x = startX + (newX - startX) * easeProgress;
      p.y = startY + (newY - startY) * easeProgress;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.shiftPoint(p);
      }
    };
    
    animate();
  }

  private drawLines(p: Point) {
    if (!p.active || !this.ctx) return;
    
    for (const closestPoint of p.closest || []) {
      this.ctx.beginPath();
      this.ctx.moveTo(p.x, p.y);
      this.ctx.lineTo(closestPoint.x, closestPoint.y);
      this.ctx.strokeStyle = `rgba(156,217,249,${p.active})`;
      this.ctx.stroke();
    }
  }

  private getDistance(p1: Point | { x: number; y: number }, p2: Point | { x: number; y: number }): number {
    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
  }

  private cleanupAnimation() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    window.removeEventListener('mousemove', this.mouseMove.bind(this));
    window.removeEventListener('scroll', this.scrollCheck.bind(this));
    window.removeEventListener('resize', this.resize.bind(this));
  }

  // Starfield methods
  private initStarfield() {
    this.starfield = document.getElementById('starfield');
    if (!this.starfield) {
    
      return;
    }

    // Debug: Check starfield dimensions
    const rect = this.starfield.getBoundingClientRect();

    this.createStars();
  }

  private createStars() {
    if (!this.starfield) {
    
      return;
    }

    // Clear existing stars
    this.stars.forEach(star => star.remove());
    this.stars = [];

    
    for (let i = 0; i < this.starCount; i++) {
      const star = this.createStar(i);
      if (star) {
        this.stars.push(star);
        this.starfield.appendChild(star);
      }
    }
  }

  private createStar(index: number): HTMLElement | null {
    const star = document.createElement('div');
    
    // Random star type for variety
    const starType = Math.floor(Math.random() * 3);
    star.className = `star star-type-${starType}`;
    
    // Random properties and positioning in pixels relative to starfield
    const size = Math.random() * 3 + 1.5; // 1.5 - 4.5px
    const rect = this.starfield!.getBoundingClientRect();
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    // Apply all styles directly to bypass CSS issues
    star.style.position = 'absolute';
    star.style.pointerEvents = 'none';
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.round(x)}px`;
    star.style.top = `${Math.round(y)}px`;
    star.style.background = 'var(--accent-color)';
    star.style.borderRadius = '50%';
    star.style.zIndex = '1000';

    // Random animation durations for variety
    const twinkle = (1.4 + Math.random() * 1.6).toFixed(2);
    const floatDur = (7 + Math.random() * 5).toFixed(2);
    const delay = (Math.random() * 2).toFixed(2);
    star.style.animation = `twinkle ${twinkle}s ease-in-out ${delay}s infinite alternate, float ${floatDur}s ease-in-out 0s infinite`;

    return star;
  }

  private cleanupStars() {
    this.stars.forEach(star => star.remove());
    this.stars = [];
  }
}
