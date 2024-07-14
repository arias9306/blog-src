import { Route } from '@angular/router';
import { BooksComponent } from './traditional/books.component';

export const appRoutes: Route[] = [
  {
    path: 'traditional',
    component: BooksComponent,
  },
];
