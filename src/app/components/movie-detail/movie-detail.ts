import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MovieDetails } from '../../models/movie';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-detail.html',
  styleUrls: ['./movie-detail.css'],
})
export class MovieDetailComponent {
  @Input() movie!: MovieDetails;

  getBackdropUrl(): string {
    return this.movie.backdrop_path
      ? `https://image.tmdb.org/t/p/original${this.movie.backdrop_path}`
      : '';
  }

  getPosterUrl(): string {
    return this.movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`
      : 'https://via.placeholder.com/500x750?text=No+Image';
  }
}
