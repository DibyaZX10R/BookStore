import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
// import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [BookListComponent, BookDetailComponent],
  imports: [CommonModule, RouterModule, BooksRoutingModule, NgbModule,SharedModule]
})
export class BooksModule { }
