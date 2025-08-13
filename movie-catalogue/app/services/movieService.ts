import api from './api';
import {Movie, MovieDetails} from '../types/movie';

// Function to fetch popular movies
export async function getPopularMovies(page=1) {
  const res = await api.get<{ page: number; results: Movie[]; total_pages: number }>('/movie/popular', {
    params: { page },
  });
  return res.data;
}

// Function to fetch movie details by ID
export async function getMovieDetails(id: number | string) {
  const res = await api.get<MovieDetails>(`/movie/${id}`);
  return res.data;
}

// Function to fetch upcoming movies
export async function getUpcomingMovies(page=1) {
  const res = await api.get<{ page: number; results: Movie[]; total_pages: number }>('/movie/upcoming', {
    params: { page },
  });
  return res.data;
}