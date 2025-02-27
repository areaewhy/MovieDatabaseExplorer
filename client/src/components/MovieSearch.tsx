import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import type { Movie } from "../types/tmdb";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../lib/tmdb";

const searchSchema = z.object({
  query: z.string().min(1, "Please enter a search term")
});

type SearchFormData = z.infer<typeof searchSchema>;

interface MovieSearchProps {
  onMovieSelect: (movie: Movie) => void;
}

export function MovieSearch({ onMovieSelect }: MovieSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMovieSelected, setIsMovieSelected] = useState(false);

  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: ""
    }
  });

  const { data: suggestions } = useQuery({
    queryKey: ["movieSuggestions", searchTerm],
    queryFn: () => searchMovies(searchTerm),
    enabled: searchTerm.length > 2
  });

  const sortedSuggestions = suggestions?.sort((a, b) => b.popularity - a.popularity);

  const onSubmit = (data: SearchFormData) => {
    // Form submission is optional now since we select directly from suggestions
  };

  return (
    <div className="space-y-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input 
                    placeholder="Search for movies..." 
                    className="bg-[#C3C7CB] border-[#424242] focus-visible:ring-0"
                    {...field}
                    value={searchTerm}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSearchTerm(value);
                      setIsMovieSelected(false);
                      field.onChange(value);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button 
            type="submit"
            className="bg-[#C3C7CB] text-black border-t-[#FFFFFF] border-l-[#FFFFFF] border-b-[#424242] border-r-[#424242] hover:bg-[#C3C7CB]"
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </form>
      </Form>

      {!isMovieSelected && suggestions && suggestions.length > 0 && (
        <div className="border-2 border-t-[#FFFFFF] border-l-[#FFFFFF] border-b-[#424242] border-r-[#424242] bg-[#C3C7CB]">
          <ScrollArea className="h-[400px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-2">
              {sortedSuggestions?.map((movie) => (
                <div
                  key={movie.id}
                  className="p-2 cursor-pointer hover:bg-[#000080] hover:text-white flex items-center gap-2 border border-[#424242] bg-[#FFFFFF]"
                  onClick={() => {
                    setSearchTerm(movie.title);
                    form.setValue("query", movie.title);
                    setIsMovieSelected(true);
                    onMovieSelect(movie);
                  }}
                >
                  {movie.poster_path ? (
                    <img 
                      src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                      alt={movie.title}
                      className="w-10 h-14 object-cover border border-[#424242]"
                    />
                  ) : (
                    <div className="w-10 h-14 bg-[#808080] border border-[#424242] flex items-center justify-center">
                      <Search className="w-4 h-4" />
                    </div>
                  )}
                  <span className="flex-1 text-sm line-clamp-2">{movie.title}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}