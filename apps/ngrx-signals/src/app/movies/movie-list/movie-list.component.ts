import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MovieStore } from '../store/movie.store';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
  providers: [MovieStore],
})
export class MovieListComponent {
  private readonly store = inject(MovieStore);
}
