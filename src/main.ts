import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { provideZonelessChangeDetection } from '@angular/core';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { ThemeService } from './app/core/services/theme.service';
import { LanguageService } from './app/core/services/language.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    FormsModule,
    ThemeService,
    LanguageService,
    provideZonelessChangeDetection()
  ]
  
});
