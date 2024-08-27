import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-book-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './book-bar.component.html',
  styleUrl: './book-bar.component.css'
})
export class BookBarComponent {

}
