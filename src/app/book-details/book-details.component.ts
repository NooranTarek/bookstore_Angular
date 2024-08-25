import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent {
  constructor(
    private router: Router
  ) {}
}
