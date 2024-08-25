import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { BookService } from '../services/book.service';
import { Book } from '../interfaces/book';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent {
  book:Book|undefined;
  constructor(private bookService:BookService ,private route: ActivatedRoute  ) {}
  ngOnInit():void{
    const id =this.route.snapshot.paramMap.get('_id');
    this.bookService.bookDetails(id).subscribe({
      next: (data: any) => {
        console.log(data);
        
        this.book = data;
      },
      error: (err) => {
        console.error('Error fetching product details', err);
      }
    });
  }
  }

