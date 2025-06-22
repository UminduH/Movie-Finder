import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home';
import { MoviePage } from './pages/movie/movie';

export const appRoutes: Routes = [
  { path: '', component: HomePage },
  { path: 'movie/:id', component: MoviePage },
  { path: '**', redirectTo: '' },
];
