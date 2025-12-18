import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { AboutComponent } from '../about/about.component';
import { SkillsComponent } from '../skills/skills.component';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, SkillsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  langService = inject(LanguageService);
}
