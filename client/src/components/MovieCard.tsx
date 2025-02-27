import type { Movie } from "../types/tmdb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Film } from "lucide-react";

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
}

export function MovieCard({ movie, onSelect }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : null;

  return (
    <Card className="bg-[#C3C7CB] border-[#424242]">
      <CardHeader className="bg-[#000080] text-white p-2 flex flex-row items-center space-y-0">
        <Film className="h-4 w-4 mr-2" />
        <CardTitle className="text-sm font-normal truncate">{movie.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-4">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          {posterUrl && (
            <img 
              src={posterUrl} 
              alt={movie.title} 
              className="w-full sm:w-24 h-48 sm:h-36 object-cover border-2 border-[#424242]"
            />
          )}
          <div className="flex-1">
            <p className="text-sm mb-2 line-clamp-3">{movie.overview}</p>
            <p className="text-sm mb-2 sm:mb-4">Released: {movie.release_date}</p>
            <Button
              onClick={() => onSelect(movie)}
              className="w-full sm:w-auto bg-[#C3C7CB] text-black border-t-[#FFFFFF] border-l-[#FFFFFF] border-b-[#424242] border-r-[#424242] hover:bg-[#C3C7CB]"
            >
              View Cast
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}