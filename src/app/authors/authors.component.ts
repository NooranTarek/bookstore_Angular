import { Component } from '@angular/core';
import { Author } from '../interfaces/author';
import { Router } from '@angular/router';
import { AuthorService } from '../services/author.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [NgFor],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css'
})
export class AuthorsComponent {
  totalAuthors: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  pageSize: number = 3;
  authors: Author[] = [];

  constructor(private router: Router, private authorService:AuthorService) {}
  ngOnInit(){
    this.loadAuthors();
  }
  loadAuthors(page: number=this.currentPage , limit: number=this.pageSize ): void{
    this.authorService.getAuthors(page,limit).subscribe((response:any)=>{
      console.log("from author",response);
      this.authors = response.authors;
      this.totalAuthors = response.totalAuthors; 
      this.totalPages = response.totalPages; 

    })
  }
  onPageChange(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadAuthors(page);
    }
  }
  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.loadAuthors(1, size); 
  }
 
  viewAuthorDetails(authorId: any): void {
    this.router.navigate(['/author-details', authorId]);
  }
}
