import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MovieDetailComponent } from '../../components/movie-detail/movie-detail';
import { MovieDetails } from '../../models/movie';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../services/tmdb-service';

@Component({
  selector: 'app-movie-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MovieDetailComponent],
  templateUrl: './movie.html',
  styleUrls: ['./movie.css'],
})
export class MoviePage implements OnInit {
  movie!: MovieDetails;

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmdbService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.tmdbService.getMovieById(id).subscribe((movie) => {
        this.movie = movie;
      });
    }
  }
}
