import { Route } from '@angular/router';
import { NewBooksComponent } from './feature-creator/new-books.component';
import { BooksComponent } from './traditional/books.component';

export const appRoutes: Route[] = [
  {
    path: 'traditional',
    component: BooksComponent,
  },
  {
    path: 'feature-creator',
    component: NewBooksComponent,
  },
];
