import { patchState, signalStore, withMethods } from '@ngrx/signals';
import { addEntity, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap } from 'rxjs';
import { Movie } from '../models/movie.type';

export const MovieStore = signalStore(
  withEntities<Movie>(),
  withMethods((store) => ({
    addMovie(movie: Movie): void {
      patchState(store, addEntity(movie));
    },
    add: rxMethod<Movie>(pipe(tap((movie: Movie) => patchState(store, addEntity(movie))))),
  }))
);
