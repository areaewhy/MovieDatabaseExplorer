export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  overview: string;
}

export interface Actor {
  id: number;
  name: string;
  profile_path: string | null;
  character: string;
  birthday: string | null;
  deathday: string | null;
}

export interface MovieSearchResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieCreditsResponse {
  cast: {
    id: number;
    name: string;
    profile_path: string | null;
    character: string;
  }[];
}
