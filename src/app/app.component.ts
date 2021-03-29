import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { GoogleBooksService } from './book-list/books.service';
import { addBook, removeBook, retrievedBookList } from './state/books.actions';
import { selectBookCollection, selectBooks } from './state/books.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  books$ = this.store.pipe(select(selectBooks));
  bookCollection$ = this.store.pipe(select(selectBookCollection));

  constructor(
    private booksService: GoogleBooksService,
    private store: Store
  ) { }

  onAdd(bookId) {
    this.store.dispatch(addBook({bookId}));
  }

  onRemove(bookId) {
    this.store.dispatch(removeBook({bookId}));
  }

  ngOnInit() {
    this.booksService
      .getBooks()
      .subscribe((Book) => this.store.dispatch(retrievedBookList({ Book })))
  }
}
