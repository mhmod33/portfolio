import { Component } from '@angular/core';

import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
})
export class HomePageComponent {}
