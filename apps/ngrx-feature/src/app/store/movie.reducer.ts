import { createFeature, createReducer, on } from '@ngrx/store';
import { Movie } from '../model/movie';
import { MovieListActions } from './movie.actions';

interface State {
  movies: Movie[];
  isLoading: boolean;
}

const initialState: State = {
  movies: [],
  isLoading: false,
};

export const MovieFeature = createFeature({
  name: 'movie',
  reducer: createReducer(
    initialState,
    on(MovieListActions.loadMovies, (state: State): State => ({ ...state, isLoading: true })),
    on(
      MovieListActions.loadMoviesSuccessful,
      (state: State, { movies }): State => ({ ...state, movies, isLoading: false })
    ),
    on(MovieListActions.loadMoviesFailed, (state: State): State => ({ ...state, isLoading: false }))
  ),
});
