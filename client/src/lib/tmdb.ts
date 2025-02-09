import type { Movie, MovieSearchResponse, MovieCreditsResponse, Actor } from "../types/tmdb";
import { apiRequest } from "./queryClient";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export async function searchMovies(query: string): Promise<Movie[]> {
  const res = await apiRequest(
    "GET", 
    `/api/movies/search?query=${encodeURIComponent(query)}`
  );
  const data = await res.json();
  return data.results;
}

export async function getMovieCredits(movieId: number): Promise<Actor[]> {
  const res = await apiRequest(
    "GET",
    `/api/movies/${movieId}/credits`
  );
  const data = await res.json();
  return data;
}
