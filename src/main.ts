import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { 
  APP_INITIALIZER,
  provideZoneChangeDetection,
  provideZonelessChangeDetection
} from '@angular/core';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { I18nService } from './app/core/i18n/i18n.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    // Enable zoneless mode
    provideZonelessChangeDetection(),
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [I18nService],
      useFactory: (i18n: I18nService) => () => i18n.init('en'),
    },
  ],
}).catch(console.error);
