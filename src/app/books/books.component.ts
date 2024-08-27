import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Book } from '../interfaces/book';
import { BookService } from '../services/book.service';
import { NgFor } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Author } from '../interfaces/author';
import { BookBarComponent } from '../book-bar/book-bar.component';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,NgFor,  BookBarComponent  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {
  books:Book[]=[];
  totalBooks: number = 0;
  totalAuthors: number = 10;
  totalPages: number = 0;
  currentPage: number = 1;
  pageSize: number = 3;
  searchQuery: string = '';
  authors: Author[] = [];

  constructor(private router: Router, private bookService:BookService,private toastr: ToastrService,
  ) {}
  ngOnInit(){
    this.loadBooks();
    this.loadAuthors();
  }
  loadBooks(page: number=this.currentPage , limit: number=this.pageSize ): void{
    this.bookService.getBooks(page,limit).subscribe((response:any)=>{
      // console.log(response);
      
      this.books=response.books;
      this.totalBooks = response.totalBooks; 
      this.totalPages = response.totalPages; 

    })
  }
  loadAuthors(page: number=this.currentPage , limit: number=10 ): void{
    this.bookService.getAuthors(page,limit).subscribe((response:any)=>{
      // console.log("from author",response);
      this.authors = response.authors.filter((author: any) => author.books && author.books.length > 0);
      this.totalAuthors = response.totalAuthors; 
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
  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
  
    if (this.searchQuery.length > 0) {
      this.bookService.searchBooks(this.searchQuery).subscribe({
        next: (data: any) => {
          // console.log(data);
          
          this.books = data;
        },
        error: (err) => {
          this.toastr.error(err);
        }
      });
    } else {
      this.loadBooks();  
    }
  }
  onAuthorSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    // console.log("target",target.value);
    const authorId = target.value;
    if (authorId) {
      this.bookService.filterBooks(authorId).subscribe((books: Book[]) => {
        this.books = books;
        
      });
    }
    else {
      this.toastr.error("No Books for this author");

    }
  }
  viewBookDetails(bookId: any): void {
    this.router.navigate(['/book-details', bookId]);
  }
}
