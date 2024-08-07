import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { MovieService } from '../services/movie.service';
import { MovieListActions } from './movie.actions';

@Injectable()
export class MovieEffects {
  private readonly actions$ = inject(Actions);
  private readonly movieService = inject(MovieService);
  private readonly snackBar = inject(MatSnackBar);

  loadMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieListActions.loadMovies),
      switchMap(() =>
        this.movieService.loadMovies().pipe(
          map((movies) => MovieListActions.loadMoviesSuccessful({ movies })),
          catchError((error: unknown) => {
            if (error instanceof Error) {
              this.snackBar.open(`${error}`, undefined, { duration: 10000 });
            }
            return of(MovieListActions.loadMoviesFailed());
          })
        )
      )
    )
  );
}
