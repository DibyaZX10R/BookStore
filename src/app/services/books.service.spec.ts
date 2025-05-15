// src/app/services/books.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { BooksService } from './books.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('BooksService', () => {
  let service: BooksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BooksService]
    });

    service = TestBed.inject(BooksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch books data from the API', () => {
    const mockBooks = [
      { volumeInfo: { title: 'Book 1', authors: ['Author 1'] } },
      { volumeInfo: { title: 'Book 2', authors: ['Author 2'] } }
    ];

    service.getBooks('fouling').subscribe(books => {
      expect(books.length).toBe(2);
      expect(books).toEqual(mockBooks);
    });

    const req = httpMock.expectOne('https://www.googleapis.com/books/v1/volumes?q=fouling');
    expect(req.request.method).toBe('GET');
    req.flush({ items: mockBooks });
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests after each test
  });
});
