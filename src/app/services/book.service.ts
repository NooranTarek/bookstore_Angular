import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../interfaces/book';
import { Observable } from 'rxjs';
import { Author } from '../interfaces/author';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private _HttpClient: HttpClient) { }
  private apiUrl = 'http://localhost:3000/books';
  getBooks(page: number, limit: number): Observable<Book[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this._HttpClient.get<Book[]>(this.apiUrl, { params });
  }
  getAuthors(page: number, limit: number): Observable<Author[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this._HttpClient.get<Author[]>('http://localhost:3000/authors', { params });
  }
  searchBooks(title: string): Observable<Book[]> {
    return this._HttpClient.get<Book[]>(`${this.apiUrl}/search?title=${title}`);
  }
  filterBooks(authorId: any): Observable<Book[]> {
    return this._HttpClient.get<Book[]>(`${this.apiUrl}/author/${authorId}`);
  }

}
