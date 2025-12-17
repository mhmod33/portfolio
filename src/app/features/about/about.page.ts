import { Component } from '@angular/core';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl:'./about.page.html',
  styleUrls:['./about.page.css']
})
export class AboutPageComponent {}
