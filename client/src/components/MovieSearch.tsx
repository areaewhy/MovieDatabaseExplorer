import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Search } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { Movie } from "../types/tmdb";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../lib/tmdb";

const searchSchema = z.object({
  query: z.string().min(1, "Please enter a search term")
});

type SearchFormData = z.infer<typeof searchSchema>;

interface MovieSearchProps {
  onSearch: (query: string) => void;
  onMovieSelect: (movie: Movie) => void;
}

export function MovieSearch({ onSearch, onMovieSelect }: MovieSearchProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

  const onSubmit = (data: SearchFormData) => {
    onSearch(data.query);
    setOpen(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem className="flex-1">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Input 
                      placeholder="Search for movies..." 
                      className="bg-[#C3C7CB] border-[#424242] focus-visible:ring-0"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setSearchTerm(e.target.value);
                        if (e.target.value.length > 2) {
                          setOpen(true);
                        }
                      }}
                    />
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-full">
                  <Command className="bg-[#C3C7CB]">
                    <CommandEmpty>No movies found.</CommandEmpty>
                    <CommandGroup>
                      {suggestions?.map((movie) => (
                        <CommandItem
                          key={movie.id}
                          onSelect={() => {
                            field.onChange(movie.title);
                            onMovieSelect(movie);
                            setOpen(false);
                          }}
                          className="cursor-pointer hover:bg-[#000080] hover:text-white"
                        >
                          {movie.title}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <Button 
          type="submit"
          className="bg-[#C3C7CB] text-black border-t-[#FFFFFF] border-l-[#FFFFFF] border-b-[#424242] border-r-[#424242] hover:bg-[#C3C7CB]"
        >
          <Search className="h-4 w-4" />
          Search
        </Button>
      </form>
    </Form>
  );
}