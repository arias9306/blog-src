import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Movie } from '../model/movie';

export const MovieListActions = createActionGroup({
  source: 'Movie List',
  events: {
    'Load Movies': emptyProps(),
    'Load Movies Successful': props<{ movies: Movie[] }>(),
    'Load Movies Failed': emptyProps(),

    // Add
    'Add Movie': props<{ movie: Movie }>(),
    'Add Successfull': props<{ movie: Movie }>(),
    'Add Failed': emptyProps(),
  },
});
