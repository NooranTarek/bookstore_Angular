import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatPaginatorModule,MatTableModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bookStore';
}
