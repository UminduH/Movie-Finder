import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './movie-list.html',
  styleUrls: ['./movie-list.css'],
})
export class MovieListComponent {
  @Input() movies: Movie[] = [];
}
