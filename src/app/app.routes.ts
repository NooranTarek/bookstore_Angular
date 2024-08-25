import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { BookDetailsComponent } from './book-details/book-details.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'books',
        component: BooksComponent,
      },
      {
        path: 'book-details/:_id',
        component: BookDetailsComponent,
      }
];
