import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadBooksActions } from './+store/actions';
import { selectBooks } from './+store/selectors';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  template: `
    <pre>
    {{ books$ | async | json }}
  </pre
    >
  `,
})
export class BooksComponent implements OnInit {
  private readonly store = inject(Store);

  books$ = this.store.select(selectBooks);

  ngOnInit(): void {
    // this.store.dispatch(loadBooks());
    this.store.dispatch(LoadBooksActions.loadBooks());
  }
}
