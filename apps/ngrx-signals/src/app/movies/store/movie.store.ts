import { computed } from '@angular/core';
import { patchState, signalStore, signalStoreFeature, type, withComputed, withMethods, withState } from '@ngrx/signals';
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

export type FilterState = { searchTerm: string };

export interface Entity {
  name: string;
}

export function withFilter() {
  return signalStoreFeature(
    {
      state: type<{ items: Entity[] }>(),
    },
    withState<FilterState>({ searchTerm: '' }),
    withComputed(({ items, searchTerm }) => ({
      filteredItems: computed(() => {
        const term = searchTerm().toLowerCase();
        return items().filter((item: Entity) => item.name.toLowerCase().includes(term));
      }),
    }))
  );
}

export const UsersStore = signalStore(withState({ items: [] }), withFilter());
