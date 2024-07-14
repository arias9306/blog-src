import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Book } from './reducer';

// export const loadBooks = createAction('[Books API] Load Books');
// export const loadBooksSuccess = createAction('[Books API] Load Books Successful', props<{ books: Book[] }>());
// export const loadBooksFailed = createAction('[Books API] Load Books Failed');

export const LoadBooksActions = createActionGroup({
  source: 'Books Api',
  events: {
    'Load Books': emptyProps(),
    'Load Books Successful': props<{ books: Book[] }>(),
    'Load Books Failed': emptyProps(),
  },
});
