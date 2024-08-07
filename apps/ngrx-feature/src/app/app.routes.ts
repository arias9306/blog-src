import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'movies',
    loadComponent: () =>
      import('./movies-list/movies-list.component').then((component) => component.MoviesListComponent),
  },
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
];
