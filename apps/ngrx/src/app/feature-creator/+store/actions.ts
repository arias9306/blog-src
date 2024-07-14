import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Book } from './reducer';

export const LoadBooksActions = createActionGroup({
  source: 'Books Api',
  events: {
    'Load Books': emptyProps(),
    'Load Books Successful': props<{ books: Book[] }>(),
    'Load Books Failed': emptyProps(),
  },
});
