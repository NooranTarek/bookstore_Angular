import { Component } from '@angular/core';
import { Author } from '../interfaces/author';
import { Router } from '@angular/router';
import { AuthorService } from '../services/author.service';
import { NgFor } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [NgFor,ReactiveFormsModule],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css'
})
export class AuthorsComponent {
  totalAuthors: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  pageSize: number = 3;
  authors: Author[] = [];
  authorForm:FormGroup;
  showAddForm: boolean = false;
  constructor(private fb: FormBuilder,private router: Router, private authorService:AuthorService,private toastr: ToastrService) {
    this.authorForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]],
      email: ['', [Validators.required]],
      bio: ['', [Validators.required]]    })
  }
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

  addAuthor(): void {
    if (this.authorForm.valid) {
      const { name, email, bio } = this.authorForm.value;
      this.authorService.addAuthor(name, email, bio).subscribe(
        (res) => {
          console.log(res);
          this.loadAuthors(); 
          this.authorForm.reset(); 
          this.showAddForm = false;
          this.toastr.success('Author Addedd successfully.');

        },
        (error) => {
          console.error('Error adding author', error);
        }
      );
    }
  }

}
