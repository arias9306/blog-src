import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { ShoppingCarItems } from '../models/shopping-car-item.model';

@Injectable({ providedIn: 'root' })
export class ShoppingCarService {
  saveItem(item: ShoppingCarItems): Observable<void> {
    console.log(item);
    return of();
  }

  loadItems(): Observable<ShoppingCarItems[]> {
    return of([
      {
        id: 1,
        name: '',
        price: 1010,
        quantity: 1,
      },
    ]).pipe(tap(() => console.log('called')));
  }
}
