import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { AuthorsComponent } from './authors/authors.component';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { BookBarComponent } from './book-bar/book-bar.component';

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
      },
      {
        path: 'authors',
        component: AuthorsComponent,
      },
      {
        path: 'author-details/:_id',
        component: AuthorDetailsComponent,
      },
      {
        path: 'book-bar',
        component: BookBarComponent,
      }
];
