import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutPageComponent {
  langService = inject(LanguageService);
  downloadCV() {
    window.open('/Mahmoud-Sayed-CV.pdf', '_blank');
  }
}
