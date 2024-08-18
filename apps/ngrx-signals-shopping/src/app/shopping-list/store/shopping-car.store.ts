import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { ShoppingCarItems } from '../models/shopping-car-item.model';
import { ShoppingCarService } from '../service/shopping-car.service';

type ShoppingCarState = {
  items: ShoppingCarItems[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialCarState: ShoppingCarState = {
  items: [],
  isLoading: false,
  filter: {
    query: '',
    order: 'asc',
  },
};

export const ShoppingCarStore = signalStore(
  withState(initialCarState),
  withComputed(({ items }) => ({
    totalItems: computed(() => items().reduce((sum, item) => sum + item.quantity, 0)),
    totalPrice: computed(() => items().reduce((sum, item) => sum + item.price * item.quantity, 0)),
  })),
  withMethods((store, shoppingCarService = inject(ShoppingCarService)) => ({
    addItem(item: ShoppingCarItems) {
      patchState(store, { items: [...store.items(), item] });
    },
    saveItem: rxMethod<ShoppingCarItems>(pipe(switchMap((item) => shoppingCarService.saveItem(item)))),
  }))
);
