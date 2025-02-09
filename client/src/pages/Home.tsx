import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Movie } from "../types/tmdb";
import { MovieSearch } from "../components/MovieSearch";
import { MovieCard } from "../components/MovieCard";
import { ActorList } from "../components/ActorList";
import { searchMovies, getMovieCredits } from "../lib/tmdb";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data: movies, isLoading: isSearching } = useQuery({
    queryKey: ["movies", searchQuery],
    queryFn: () => searchMovies(searchQuery),
    enabled: searchQuery.length > 0
  });

  const { data: actors, isLoading: isLoadingActors } = useQuery({
    queryKey: ["credits", selectedMovie?.id],
    queryFn: () => selectedMovie ? getMovieCredits(selectedMovie.id) : null,
    enabled: !!selectedMovie
  });

  return (
    <div className="min-h-screen bg-[#008080] p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#C3C7CB] border-t-[#FFFFFF] border-l-[#FFFFFF] border-b-[#424242] border-r-[#424242] border-2 p-4 mb-4">
          <MovieSearch onSearch={setSearchQuery} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            {isSearching ? (
              <Skeleton className="h-48" />
            ) : movies && movies.length > 0 ? (
              movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onSelect={setSelectedMovie}
                />
              ))
            ) : searchQuery ? (
              <p className="text-white">No movies found</p>
            ) : null}
          </div>

          <div>
            {isLoadingActors ? (
              <Skeleton className="h-96" />
            ) : actors && actors.length > 0 ? (
              <ActorList actors={actors} />
            ) : selectedMovie ? (
              <p className="text-white">No cast information available</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
