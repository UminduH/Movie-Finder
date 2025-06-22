import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SearchBarComponent } from '../../components/search-bar/search-bar';
import { MovieListComponent } from '../../components/movie-list/movie-list';
import { Movie } from '../../models/movie';
import { TmdbService } from '../../services/tmdb-service';
import { PaginationComponent } from '../../components/pagination/pagination';

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

  constructor(private tmdb: TmdbService) {}

  ngOnInit() {
    this.loadPopularMovies();
  }

  onSearch(query: string, page: number = 1) {
    if (!query.trim()) {
      this.clearSearch();
      return;
    }

    this.currentQuery = query;
    this.currentPage = page;
    this.hasSearched = true;

    this.tmdb.searchMovies(query, page).subscribe((res) => {
      this.movies = res.results;
      this.totalPages = res.total_pages;
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
    this.currentPage = page;

    this.tmdb.getPopularMovies(page).subscribe((res) => {
      this.popularMovies = res.results;
      this.totalPages = res.total_pages;
    });
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;

    if (this.currentQuery) {
      this.onSearch(this.currentQuery, page);
    } else {
      this.loadPopularMovies(page);
    }
  }
}
