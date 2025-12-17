import { Component, inject, OnInit, OnDestroy } from '@angular/core';
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
export class HeroComponent implements OnInit, OnDestroy {
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

  // Star properties
  private starfield: HTMLElement | null = null;
  private stars: HTMLElement[] = [];
  private starCount = 200;

  t(translation: { en: string; ar: string }): string {
    return this.langService.t(translation);
  }

  downloadCV() {
    window.open('/Mahmoud-Sayed-CV.pdf', '_blank');
  }

  ngOnInit() {
    this.initStarfield();
    this.initCanvasAnimation();
  }

  ngOnDestroy() {
    this.cleanupAnimation();
    this.cleanupStars();
  }

  private initStarfield() {
    this.starfield = document.getElementById('starfield');
    if (!this.starfield) return;

    // Create stars dynamically
    for (let i = 0; i < this.starCount; i++) {
      this.createStar(i);
    }
  }

  private createStar(index: number) {
    if (!this.starfield) return;

    const star = document.createElement('div');
    star.className = 'star';
    
    // Random properties
    const size = Math.random() * 3 + 1; // 1-4px
    const x = Math.random() * 100; // 0-100%
    const y = Math.random() * 100; // 0-100%
    const opacity = Math.random() * 0.8 + 0.2; // 0.2-1.0
    const animationDuration = Math.random() * 20 + 10; // 10-30s
    const animationDelay = Math.random() * 5; // 0-5s
    
    // Apply styles
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    star.style.opacity = opacity.toString();
    star.style.animationDuration = `${animationDuration}s`;
    star.style.animationDelay = `${animationDelay}s`;
    
    // Add glow effect for larger stars
    if (size > 2.5) {
      star.style.boxShadow = `0 0 ${size * 2}px rgba(255, 255, 255, ${opacity * 0.5})`;
    }
    
    this.starfield.appendChild(star);
    this.stars.push(star);
  }

  private cleanupStars() {
    this.stars.forEach(star => {
      if (star.parentNode) {
        star.parentNode.removeChild(star);
      }
    });
    this.stars = [];
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
}
