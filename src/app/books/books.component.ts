import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Book } from '../interfaces/book';
import { BookService } from '../services/book.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,NgFor],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {
  books:Book[]=[];
  totalBooks: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  pageSize: number = 3;
  constructor(private router: Router, private bookService:BookService) {}
  ngOnInit(){
    this.loadBooks();
  }
  loadBooks(page: number=this.currentPage , limit: number=this.pageSize ): void{
    this.bookService.getBooks(page,limit).subscribe((response:any)=>{
      console.log(response);
      
      this.books=response.books;
      this.totalBooks = response.totalBooks; 
      this.totalPages = response.totalPages; 

    })
  }

  onPageChange(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadBooks(page);
    }
  }
  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.loadBooks(1, size); 
  }
}
