import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Movie } from '../model/movie';

@Injectable({ providedIn: 'root' })
export class MovieService {
  loadMovies(): Observable<Movie[]> {
    const movies: Movie[] = [
      {
        key: 1,
        title: 'Inception',
        sinopsis:
          'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
        rating: 8.8,
      },
      {
        key: 2,
        title: 'The Shawshank Redemption',
        sinopsis:
          'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
        rating: 9.3,
      },
      {
        key: 3,
        title: 'The Godfather',
        sinopsis:
          'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
        rating: 9.2,
      },
      {
        key: 4,
        title: 'The Dark Knight',
        sinopsis:
          'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.',
        rating: 9.0,
      },
      {
        key: 5,
        title: 'Pulp Fiction',
        sinopsis:
          'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
        rating: 8.9,
      },
      {
        key: 6,
        title: 'The Lord of the Rings: The Return of the King',
        sinopsis:
          "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
        rating: 8.9,
      },
      {
        key: 7,
        title: 'Fight Club',
        sinopsis:
          'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.',
        rating: 8.8,
      },
      {
        key: 8,
        title: 'Forrest Gump',
        sinopsis:
          'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold from the perspective of an Alabama man with an IQ of 75.',
        rating: 8.8,
      },
      {
        key: 9,
        title: 'The Matrix',
        sinopsis:
          'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
        rating: 8.7,
      },
      {
        key: 10,
        title: 'Goodfellas',
        sinopsis:
          'The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.',
        rating: 8.7,
      },
    ];
    return of(movies).pipe(
      delay(1500)
      // tap(() => {
      //   throw new Error('There Was a problem loading the movies');
      // })
    );
  }
}
