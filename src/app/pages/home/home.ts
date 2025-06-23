import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SearchBarComponent } from '../../components/search-bar/search-bar';
import { MovieListComponent } from '../../components/movie-list/movie-list';
import { Movie } from '../../models/movie';
import { TmdbService } from '../../services/tmdb-service';
import { PaginationComponent } from '../../components/pagination/pagination';
import { forkJoin, timer } from 'rxjs';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    SearchBarComponent,
    MovieListComponent,
    PaginationComponent,
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomePage implements OnInit {
  movies: Movie[] = [];
  popularMovies: Movie[] = [];

  currentPage: number = 1;
  totalPages: number = 1;
  currentQuery: string = '';
  hasSearched: boolean = false;
  isLoading: boolean = false;

  constructor(private tmdb: TmdbService) {}

  ngOnInit() {
    this.loadPopularMovies();
  }

  onSearch(query: string, page: number = 1) {
    if (!query.trim()) {
      this.clearSearch();
      return;
    }

    this.isLoading = true;
    this.currentQuery = query;
    this.currentPage = page;
    this.hasSearched = true;

    const apiCall$ = this.tmdb.searchMovies(query, page);
    const delay$ = timer(500);

    forkJoin([apiCall$, delay$]).subscribe(([res]) => {
      this.movies = res.results;
      this.totalPages = res.total_pages;
      this.isLoading = false;
    });
  }

  clearSearch() {
    this.movies = [];
    this.currentQuery = '';
    this.hasSearched = false;
    this.currentPage = 1;
    this.loadPopularMovies();
  }

  loadPopularMovies(page: number = 1) {
    this.isLoading = true;
    this.currentPage = page;

    const apiCall$ = this.tmdb.getPopularMovies(page);
    const delay$ = timer(200);

    forkJoin([apiCall$, delay$]).subscribe(([res]) => {
      this.popularMovies = res.results;
      this.totalPages = res.total_pages;
      this.isLoading = false;
    });
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (this.hasSearched) {
      this.onSearch(this.currentQuery, page);
    } else {
      this.loadPopularMovies(page);
    }
  }
}
