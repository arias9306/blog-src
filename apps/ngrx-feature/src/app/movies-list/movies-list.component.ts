import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { MovieListActions } from '../store/movie.actions';
import { MovieFeature } from '../store/movie.reducer';

@Component({
    selector: 'app-movies-list',
    imports: [AsyncPipe, MatCardModule, MatProgressSpinnerModule, MatButtonModule, MatIconModule],
    templateUrl: './movies-list.component.html',
    styleUrl: './movies-list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesListComponent implements OnInit {
  private readonly store = inject(Store);

  private readonly listOfMovies$ = this.store.select(MovieFeature.selectMovies);
  private readonly isLoading$ = this.store.select(MovieFeature.selectIsLoading);

  protected data$ = combineLatest({
    listOfMovies: this.listOfMovies$,
    isLoading: this.isLoading$,
  });

  ngOnInit(): void {
    this.store.dispatch(MovieListActions.loadMovies());
  }
}
