import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ShoppingCarStore } from './store/shopping-car.store';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
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
  providers: [ShoppingCarStore],
})
export class ShoppingCarComponent {
  private readonly shoppingCarStore = inject(ShoppingCarStore);

  items = this.shoppingCarStore.items;
  isLoading = this.shoppingCarStore.isLoading;
  filter = this.shoppingCarStore.filter;

  // Accessing the computed signals for total items and total price
  totalItems = this.shoppingCarStore.totalItems;
  totalPrice = this.shoppingCarStore.totalPrice;

  add() {
    this.shoppingCarStore.addItem({
      id: 0,
      name: '',
      price: 100,
      quantity: 1,
    });
  }
}
