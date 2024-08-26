import { Component, Input } from '@angular/core';
import { Author } from '../interfaces/author';
import { AuthorService } from '../services/author.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
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
  showEditForm: boolean = false;
  @Input() authorData  !: Author;

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private authorService: AuthorService,
    private route: ActivatedRoute
  ) {
    this.authorForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      bio: ['']
    });
  }
  ngOnInit():void{
    this.showAuthorDetauls();
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
  
}
