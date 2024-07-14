import { createReducer, on } from '@ngrx/store';
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
}

export interface AppState {
  'traditional-books': State;
}

export const initialState: State = {
  books: [],
};

export const booksReducer = createReducer(
  initialState,
  on(LoadBooksActions.loadBooksSuccessful, (state, { books }): State => ({ ...state, books }))
);
