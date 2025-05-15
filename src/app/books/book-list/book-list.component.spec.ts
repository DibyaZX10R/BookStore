// src/app/books/book-list/book-list.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookListComponent } from './book-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // For mocking HTTP requests
import { Observable, of, throwError } from 'rxjs';
import { BooksService } from '../../services/books.service'; // Assuming this is the service used for API calls
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let booksService: BooksService;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookListComponent],
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule to test HTTP requests
      providers: [BooksService], // Inject the BooksService
      schemas: [NO_ERRORS_SCHEMA], // Ignore unknown elements (like loading spinner)
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    booksService = TestBed.inject(BooksService); // Get the BooksService instance
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch books on init', () => {
    const mockBooks = [
      { volumeInfo: { title: 'Book 1', authors: ['Author 1'] } },
      { volumeInfo: { title: 'Book 2', authors: ['Author 2'] } }
    ];

    spyOn(booksService, 'getBooks').and.returnValue(of(mockBooks)); // Mock the API response

    component.ngOnInit(); // Call ngOnInit to trigger the book fetch
    fixture.detectChanges();

    expect(component.books).toEqual(mockBooks); // Verify books are assigned to the component
  });

  it('should handle error if books fetch fails', () => {
    const errorResponse = new Error('Something went wrong');
    spyOn(booksService, 'getBooks').and.returnValue(throwError(errorResponse));

    component.ngOnInit(); // Call ngOnInit
    fixture.detectChanges();

    expect(component.error).toBe('Something went wrong'); // Ensure error state is set
  });

  // it('should show loading spinner while fetching books', () => {
  //   spyOn(booksService, 'getBooks').and.returnValue(new Observable()); // Make HTTP call hang

  //   component.ngOnInit();
  //   fixture.detectChanges();

  //   const loadingSpinner = fixture.nativeElement.querySelector('app-loading-spinner');
  //   expect(loadingSpinner).toBeTruthy(); // Check if loading spinner is displayed
  // });
});
