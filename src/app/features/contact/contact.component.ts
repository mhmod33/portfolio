import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../core/services/language.service';
import { portfolioData } from '../../core/utils/portfolio-data';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  langService = inject(LanguageService);

  onSubmit() {
    // Here you would typically send the data to a backend service
    alert(this.langService.t({
      en: 'Thank you for your message! I will get back to you soon.',
      ar: 'شكراً لرسالتك! سأعود إليك قريباً.'
    }));

    // Reset form
    this.formData = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}
