import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Movie, MovieDetails } from '../models/movie';

@Injectable({ providedIn: 'root' })
export class TmdbService {
  #apiKey = environment.tmdbApiKey;
  #baseUrl = environment.tmdbBaseUrl;

  constructor(private http: HttpClient) {}

  searchMovies(
    query: string,
    page: number = 1
  ): Observable<{ results: Movie[]; total_pages: number }> {
    const params = new HttpParams()
      .set('api_key', this.#apiKey)
      .set('query', query)
      .set('page', page.toString());

    return this.http.get<{ results: Movie[]; total_pages: number }>(
      `${this.#baseUrl}/search/movie`,
      { params }
    );
  }

  getMovieById(id: string): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(
      `${this.#baseUrl}/movie/${id}?api_key=${this.#apiKey}`
    );
  }

  getPopularMovies(
    page: number = 1
  ): Observable<{ results: Movie[]; total_pages: number }> {
    const params = new HttpParams()
      .set('api_key', this.#apiKey)
      .set('language', 'en-US')
      .set('page', page.toString());

    return this.http.get<{ results: Movie[]; total_pages: number }>(
      `${this.#baseUrl}/movie/popular`,
      { params }
    );
  }
}
