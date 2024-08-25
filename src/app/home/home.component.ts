import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { BooksComponent } from '../books/books.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,BooksComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(
    private router: Router
  ) {}
  scrollToBooks(): void {
    const booksSection = document.getElementById('books');
    if (booksSection) {
      booksSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
}
