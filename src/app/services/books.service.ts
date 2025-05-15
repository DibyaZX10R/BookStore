import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Book } from '../models/model';

@Injectable({ providedIn: 'root' })
export class BooksService {
  private baseUrl = 'https://www.googleapis.com/books/v1/volumes?q=fouling';

  constructor(private http: HttpClient) {}

  getBooks(p0: string): Observable<any> {
    return this.http.get<any>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`https://www.googleapis.com/books/v1/volumes/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error('Something went wrong while fetching data.'));
  }
}

