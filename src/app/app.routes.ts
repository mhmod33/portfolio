import { Routes } from '@angular/router';

import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/home.page').then((m) => m.HomePageComponent),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./features/about/about.page').then((m) => m.AboutPageComponent),
      },
      {
        path: 'case-studies',
        loadComponent: () =>
          import('./features/case-studies/case-studies.page').then(
            (m) => m.CaseStudiesPageComponent,
          ),
      },
      {
        path: 'projects',
        loadComponent: () =>
          import('./features/projects/projects.page').then(
            (m) => m.ProjectsPageComponent,
          ),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./features/contact/contact.page').then(
            (m) => m.ContactPageComponent,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
