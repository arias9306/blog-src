import { ActionReducer, createReducer, MetaReducer, on } from '@ngrx/store';
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

export function log(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

export function loggerMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('State before:', state);
    console.log('Action:', action);
    const newState = reducer(state, action);
    console.log('State after:', newState);
    return newState;
  };
}

export const metaReducers: MetaReducer<any>[] = [loggerMetaReducer];
