import { ContactService } from './../../shared/services/contact.service';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LanguageService } from '../../core/services/language.service';
import { portfolioData } from '../../core/utils/portfolio-data';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent {
  submitted = false;

  contactForm!:FormGroup;
  langService = inject(LanguageService);
  constructor(
    private ContactService: ContactService,
    private FormBuilder: FormBuilder
  ) {
    this.contactForm=this.FormBuilder.group({
      name:[''],
      email:[''],
      subject:[''],
      message:['']
    });

    this.initializeForm();
  }


  initializeForm() {
    this.contactForm = this.FormBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
    });
  }
  onSubmit() {
    this.submitted = true;

    if (this.contactForm.invalid) {
      return;
    }
    this.ContactService.contact(this.contactForm.value).subscribe({
      next: (response) => {
        alert('Message sent successfully!');
        console.log('Message sent successfully', response);
      },
      error: (error) => {
        console.error('Error sending message', error);
      }
    });
    // Here you would typically send the data to a backend service
    alert(this.langService.t({
      en: 'Thank you for your message! I will get back to you soon.',
      ar: 'شكراً لرسالتك! سأعود إليك قريباً.'
    }));

    // Reset form
    this.contactForm.reset();
  }
  //check field validity
  isFieldInvalid(field: string): boolean {
    const control = this.contactForm.get(field);
    return !!control && control.invalid && (control.touched || this.submitted);
  }
    // error messages
  getErrorMessage(field: string): string {
    const control = this.contactForm.get(field);

    if (!control || !control.errors) return '';

    if (control.errors['required']) {
      return 'This field is required';
    }
    if (control.errors['minlength']) {
      return `Minimum length is ${control.errors['minlength'].requiredLength} characters`;
    }
    if (control.errors['maxlength']) {
      return `Maximum length is ${control.errors['maxlength'].requiredLength} characters`;
    }
    if (control.errors['min']) {
      return `Minimum value is ${control.errors['min'].min}`;
    }
    if (control.errors['max']) {
      return `Maximum value is ${control.errors['max'].max}`;
    }

    return 'Invalid value';
  }
  }


