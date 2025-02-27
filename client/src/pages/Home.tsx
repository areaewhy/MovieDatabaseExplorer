import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Movie } from "../types/tmdb";
import { MovieSearch } from "../components/MovieSearch";
import { ActorList } from "../components/ActorList";
import { getMovieCredits } from "../lib/tmdb";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data: actors, isLoading: isLoadingActors } = useQuery({
    queryKey: ["credits", selectedMovie?.id],
    queryFn: () => selectedMovie ? getMovieCredits(selectedMovie.id) : null,
    enabled: !!selectedMovie
  });

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="min-h-screen bg-[#008080] p-2 sm:p-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#C3C7CB] border-t-[#FFFFFF] border-l-[#FFFFFF] border-b-[#424242] border-r-[#424242] border-2 p-2 sm:p-4 mb-4">
          <MovieSearch onMovieSelect={handleMovieSelect} />
        </div>

        {isLoadingActors ? (
          <Skeleton className="h-96" />
        ) : actors && actors.length > 0 ? (
          <ActorList actors={actors} />
        ) : selectedMovie ? (
          <p className="text-white">No cast information available</p>
        ) : (
          <div className="text-center text-white p-4">
            <p>Search for a movie to view its cast</p>
          </div>
        )}
      </div>
    </div>
  );
}