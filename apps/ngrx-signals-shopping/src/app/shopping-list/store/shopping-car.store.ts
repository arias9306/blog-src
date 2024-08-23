import { computed, inject, Injectable } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { ShoppingCarItems } from '../models/shopping-car-item.model';
import { ShoppingCarService } from '../service/shopping-car.service';

@Injectable({ providedIn: 'root' })
export class Logger {
  log(log: string) {
    console.log(log);
  }
}

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
    loadItems: rxMethod<void>(
      pipe(
        switchMap(() => shoppingCarService.loadItems().pipe(tap((result) => patchState(store, { items: [...result] }))))
      )
    ),
  })),
  withHooks((store) => {
    const logger = inject(Logger);

    return {
      onInit() {
        logger.log('OnInit');
        store.loadItems();
      },
      onDestroy() {
        logger.log('OnDestroy');
      },
    };
  })
  // withHooks({
  //   onInit(store) {
  //     store.loadItems();
  //   },
  //   onDestroy(store) {
  //     console.log('totalItems on destroy', store.totalItems());
  //   },
  // })
);
