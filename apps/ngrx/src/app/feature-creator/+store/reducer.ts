import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { LoadBooksActions } from './actions';

export interface Book {
  number: number;
  title: string;
  originalTitle: string;
  releaseDate: string;
  description: string;
  pages: number;
  cover: string;
  index: number;
}

export interface State {
  books: Book[];
  isLoading: boolean;
  query: string;
}

export const initialState: State = {
  books: [],
  isLoading: false,
  query: '',
};

export const booksFeature = createFeature({
  name: 'books',
  reducer: createReducer(
    initialState,
    on(
      LoadBooksActions.loadBooksSuccessful,
      (state, { books }): State => ({
        ...state,
        books,
      })
    )
  ),
  extraSelectors: ({ selectQuery, selectBooks }) => ({
    selectFilteredBooks: createSelector(selectQuery, selectBooks, (query, books) =>
      books.filter((book) => book.title.includes(query))
    ),
  }),
});

export const { name, reducer, selectBooksState, selectBooks, selectIsLoading, selectQuery, selectFilteredBooks } =
  booksFeature;
