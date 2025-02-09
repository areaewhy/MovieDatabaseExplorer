import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Search } from "lucide-react";

const searchSchema = z.object({
  query: z.string().min(1, "Please enter a search term")
});

type SearchFormData = z.infer<typeof searchSchema>;

interface MovieSearchProps {
  onSearch: (query: string) => void;
}

export function MovieSearch({ onSearch }: MovieSearchProps) {
  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: ""
    }
  });

  const onSubmit = (data: SearchFormData) => {
    onSearch(data.query);
  };

  return (
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
                />
              </FormControl>
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
