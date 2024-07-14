import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './traditional/+store/reducer';

@Injectable({ providedIn: 'root' })
export class BookService {
  private readonly http = inject(HttpClient);
  private readonly url = 'https://potterapi-fedeperin.vercel.app/en/books';

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.url);
  }
}
