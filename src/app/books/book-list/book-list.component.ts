import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls:[ './book-list.component.css']
})
export class BookListComponent implements OnInit{
  books$: Observable<any> = of([]);isLoading: any;
  books: any;

  loading = true;
  error = '';

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.books$ = this.booksService.getBooks('fouling').pipe(
      finalize(() => this.loading = false),
      catchError(err => {
        this.error = err.message;
        return of(null);
      })
    );
  }

}
