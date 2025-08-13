import api from './api';
import {Movie, MovieDetails} from '../types/movie';

export async function getPopularMovies(page=1) {
  const res = await api.get<{ page: number; results: Movie[]; total_pages: number }>('/movie/popular', {
    params: { page },
  });
  return res.data;
}

export async function getMovieDetails(id: number | string) {
  const res = await api.get<MovieDetails>(`/movie/${id}`);
  return res.data;
}

export async function getUpcomingMovies(page=1) {
  const res = await api.get<{ page: number; results: Movie[]; total_pages: number }>('/movie/upcoming', {
    params: { page },
  });
  return res.data;
}