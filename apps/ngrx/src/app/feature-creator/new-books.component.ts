import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadBooksActions } from './+store/actions';
import { booksFeature } from './+store/reducer';

@Component({
  selector: 'app-books',
  imports: [AsyncPipe, JsonPipe],
  template: ` <h1>Feature Creator</h1>
    <pre>
    {{ books$ | async | json }}
  </pre
    >`,
  standalone: true,
})
export class NewBooksComponent implements OnInit {
  private readonly store = inject(Store);

  books$ = this.store.select(booksFeature.selectBooks);

  ngOnInit(): void {
    this.store.dispatch(LoadBooksActions.loadBooks());
  }
}
