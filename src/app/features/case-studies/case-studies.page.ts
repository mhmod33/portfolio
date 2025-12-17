import { Component } from '@angular/core';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'app-case-studies-page',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './case-studies.page.html',
  styleUrls: ['./case-studies.page.css']
})
export class CaseStudiesPageComponent {}
