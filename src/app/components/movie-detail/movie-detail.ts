import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MovieDetails } from '../../models/movie';
import { SafeUrlPipe } from '../../pipes/safe-url-pipe';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe],
  templateUrl: './movie-detail.html',
  styleUrls: ['./movie-detail.css'],
})
export class MovieDetailComponent {
  @Input() movie!: MovieDetails;
  // @ViewChild('trailerSection') trailerSection?: ElementRef;

  showTrailer = false;
  isClosingTrailer = false;

  // toggleTrailer() {
  //   this.showTrailer = !this.showTrailer;

  //   if (this.showTrailer) {
  //     setTimeout(() => {
  //       this.trailerSection?.nativeElement.scrollIntoView({
  //         behavior: 'smooth',
  //       });
  //     }, 200);
  //   }
  // }

  openTrailerModal() {
    this.isClosingTrailer = false;
    this.showTrailer = true;
  }

  closeTrailerModal() {
    this.isClosingTrailer = true;

    setTimeout(() => {
      this.showTrailer = false;
      this.isClosingTrailer = false;
    }, 300);
  }

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
