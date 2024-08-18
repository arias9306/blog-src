import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ShoppingCarItems } from '../models/shopping-car-item.model';

@Injectable({ providedIn: 'root' })
export class ShoppingCarService {
  saveItem(item: ShoppingCarItems): Observable<void> {
    console.log(item);
    return of();
  }
}
