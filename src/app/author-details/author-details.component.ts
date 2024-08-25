import { Component } from '@angular/core';
import { Author } from '../interfaces/author';
import { AuthorService } from '../services/author.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-author-details',
  standalone: true,
  imports: [],
  templateUrl: './author-details.component.html',
  styleUrl: './author-details.component.css'
})
export class AuthorDetailsComponent {
  author:Author|undefined;
  constructor(private authorService:AuthorService ,private route: ActivatedRoute  ) {}
  ngOnInit():void{
    const id =this.route.snapshot.paramMap.get('_id');
    this.authorService.authorDetails(id).subscribe({
      next: (data: any) => {
        console.log(data);
        
        this.author = data;
      },
      error: (err) => {
        console.error('Error fetching product details', err);
      }
    });
  }
}
