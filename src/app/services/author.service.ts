import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from '../interfaces/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private _HttpClient: HttpClient) { }
  private apiUrl = 'http://localhost:3000/authors';
  getAuthors(page: number, limit: number): Observable<Author[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this._HttpClient.get<Author[]>(this.apiUrl, { params });
  }
  authorDetails(id: any): Observable<Author[]> {
    return this._HttpClient.get<Author[]>(`${this.apiUrl}/${id}`);
  }
  addAuthor(name: string, email: string, bio: string): Observable<any> {
    const author = { name, email, bio };
    return this._HttpClient.post(`${this.apiUrl}`, author);
  }
  updateAuthor(id: any,authorData:any): Observable<any> {
    return this._HttpClient.put(`${this.apiUrl}/${id}`, authorData);
  }

  deleteAuthor(id: any): Observable<any> {
    return this._HttpClient.delete(`${this.apiUrl}/${id}`);
  }
}
