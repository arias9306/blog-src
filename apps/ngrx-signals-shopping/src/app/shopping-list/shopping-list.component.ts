import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { interval, map, of, pipe, tap } from 'rxjs';
import { ShoppingCarStore } from './store/shopping-car.store';

@Component({
    selector: 'app-shopping-cart',
    template: `
    <p>Items: {{ items() | json }}</p>
    <p>Loading: {{ isLoading() }}</p>

    <!--  The DeepSignal value can be read in the same way as Signal. -->
    <p>Pagination: {{ filter() | json }}</p>

    <!--  Nested signals are created as DeepSignal properties. -->
    <p>Query: {{ filter.query() }}</p>
    <p>Order: {{ filter.order() }}</p>

    <p>Total Items: {{ totalItems() }}</p>
    <p>Total Price: {{ totalPrice() }}</p>

    <button (click)="add()">add</button>
  `,
    imports: [JsonPipe],
    providers: [ShoppingCarStore]
})
export class ShoppingCarComponent implements OnInit {
  private readonly shoppingCarStore = inject(ShoppingCarStore);

  items = this.shoppingCarStore.items;
  isLoading = this.shoppingCarStore.isLoading;
  filter = this.shoppingCarStore.filter;

  // Accessing the computed signals for total items and total price
  totalItems = this.shoppingCarStore.totalItems;
  totalPrice = this.shoppingCarStore.totalPrice;

  num = signal(10);
  add() {
    this.shoppingCarStore.addItem({
      id: 0,
      name: '',
      price: 100,
      quantity: 1,
    });
    this.num.update((value) => value + 20); // console: 40
  }

  readonly logTripledTemperature = rxMethod<number>(
    pipe(
      map((temp) => temp * 3),
      tap((tripledTemp) => console.log(`Tripled Temperature: ${tripledTemp}°C`))
    )
  );

  readonly logDoubledNumber = rxMethod<number>(
    pipe(
      map((num) => num * 2),
      tap(console.log)
    )
  );

  ngOnInit(): void {
    // this.logDoubledNumber(this.num); // console: 20
    this.logTripledTemperature(15);
    this.logTripledTemperature(20);

    const num1$ = of(100, 200, 300);
    this.logDoubledNumber(num1$); // console: 200, 400, 600

    const num2$ = interval(2000);
    this.logDoubledNumber(num2$); // console: 0, 2, 4, ... (every 2 seconds)
  }
}
