import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { BookService } from '../../books.service';
import { LoadBooksActions } from './actions';

@Injectable()
export class BooksEffect {
  private readonly actions$ = inject(Actions);
  private readonly booksService = inject(BookService);

  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadBooksActions.loadBooks),
      switchMap(() =>
        this.booksService.getAllBooks().pipe(
          map((books) => {
            return LoadBooksActions.loadBooksSuccessful({ books });
          }),
          catchError(() => of(LoadBooksActions.loadBooksFailed()))
        )
      )
    )
  );
}
