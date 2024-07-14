import { createSelector } from '@ngrx/store';
import { AppState, State } from './reducer';

export const selectFeature = (state: AppState) => state['traditional-books'];

export const selectBooks = createSelector(selectFeature, (state: State) => state.books);
