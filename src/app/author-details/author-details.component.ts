import { Component, Input } from '@angular/core';
import { Author } from '../interfaces/author';
import { AuthorService } from '../services/author.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { BookService } from '../services/book.service';
@Component({
  selector: 'app-author-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './author-details.component.html',
  styleUrl: './author-details.component.css'
})
export class AuthorDetailsComponent {
  author:Author|undefined;
  authorForm:FormGroup;
  bookForm:FormGroup;
  showEditForm: boolean = false;
  showEditBookForm: boolean = false;
  @Input() authorData  !: Author;
  booksOfAuthor:any;
  showAddForm: boolean = false;

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private bookService:BookService
  ) {
    this.authorForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      bio: ['']
    });
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      image: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]]
    });
  }
  ngOnInit():void{
    this.showAuthorDetauls();
    this.authorBooks();
  }
  showAuthorDetauls():void{
    const id =this.route.snapshot.paramMap.get('_id');
    this.authorService.authorDetails(id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.author = data;
        this.authorForm.patchValue(data);

      },
      error: (err) => {
        console.error('Error fetching author details', err);
      }
    });
  }
  updateAuthor(): void {
    if (this.authorForm.valid && this.author) {
      const updatedAuthor = this.authorForm.value;
      this.authorService.updateAuthor(this.author._id, updatedAuthor).subscribe({
        next: (res) => {
          this.author = res;
          this.authorForm.patchValue(res);
          this.toastr.success('Author updated successfully.');
          this.showEditForm = false;
          this.showAuthorDetauls();

        },
        error: (err: HttpErrorResponse) => {
          console.error('Error updating author', err);
          this.toastr.error(err.error.message);
        }
      });
    }
  }

  cancelEdit(): void {
    this.showEditForm = false;
    this.showEditBookForm=false;
  }

  deleteAuthor(): void {
    if (this.author) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this author!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (this.author&&result.isConfirmed) {
          this.authorService.deleteAuthor(this.author._id).subscribe({
            next: (res) => {
              this.toastr.success('Author deleted successfully.');
              this.router.navigate(['/authors']);
            },
            error: (err: HttpErrorResponse) => {
              console.error('Error deleting author', err);
              this.toastr.error('Failed to delete author.');
            }
          });
        }
      });
    }
  }
authorBooks ():void{
  const id =this.route.snapshot.paramMap.get('_id');
  this.authorService.authorBooks(id).subscribe({
    next: (data: any) => {
      console.log("author  books -->",data);
      this.booksOfAuthor = data;
    },
    error: (err) => {
      console.error('Error fetching author details', err);
    }
  });
}
viewBookDetails(bookId: any): void {
  this.router.navigate(['/book-details', bookId]);
}

//______________________book____________________
addBook(): void {
  if (this.bookForm.valid && this.author) {
    const { title, description, image } = this.bookForm.value;
    const authorId = this.author._id; 
    this.bookService.addBook(title, description, image, authorId).subscribe(
      (res) => {
        console.log(res);
        console.log('Image URL:', image);
        this.authorBooks();
        this.bookForm.reset(); 
        this.showAddForm = false;
        this.toastr.success('Book added successfully.');

      },
      (error: HttpErrorResponse) => {
        console.log("error----->", error.error.message);
        this.toastr.error(error.error.message);
      }
    );
  }
}
deleteBook(bookId: string): void {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this Book!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.bookService.deleteBook(bookId).subscribe({
        next: (res) => {
          this.toastr.success('Book deleted successfully.');
          this.authorBooks(); 
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error deleting book', err);
          this.toastr.error('Failed to delete book.');
        }
      });
    }
  });
}
updateBook(bookId: any): void {
  if (this.bookForm.valid) {
    const updatedBook= this.bookForm.value;
    this.bookService.updateBook(bookId, updatedBook).subscribe({
      next: (res) => {
        console.log("this author",res);
        this.author = res;
        
        // this.bookForm.patchValue(res);
        this.toastr.success('Book updated successfully.');
        this.showEditBookForm = false;
        this.showAuthorDetauls();

      },
      error: (err: HttpErrorResponse) => {
        console.error('Error updating book', err);
        this.toastr.error(err.error.message);
      }
    });
  }
}
}
