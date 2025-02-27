import type { Actor } from "../types/tmdb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users } from "lucide-react";

interface ActorListProps {
  actors: Actor[];
}

export function ActorList({ actors }: ActorListProps) {
  // Sort actors by death date descending, putting null dates at the end
  const sortedActors = [...actors].sort((a, b) => {
    if (!a.deathday && !b.deathday) return 0;
    if (!a.deathday) return 1;
    if (!b.deathday) return -1;
    return new Date(b.deathday).getTime() - new Date(a.deathday).getTime();
  });

  return (
    <Card className="bg-[#C3C7CB] border-[#424242]">
      <CardHeader className="bg-[#000080] text-white p-2 flex flex-row items-center space-y-0">
        <Users className="h-4 w-4 mr-2" />
        <CardTitle className="text-sm font-normal">Cast Members</CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-4">
        <ScrollArea className="h-[300px] sm:h-[400px] pr-2 sm:pr-4">
          <div className="space-y-2 sm:space-y-4">
            {sortedActors.map((actor) => (
              <div 
                key={actor.id} 
                className="bg-[#FFFFFF] p-2 sm:p-3 border-t-[#FFFFFF] border-l-[#FFFFFF] border-b-[#424242] border-r-[#424242] border-2"
              >
                <div className="flex gap-2 sm:gap-3">
                  {actor.profile_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                      alt={actor.name}
                      className="w-12 sm:w-16 h-18 sm:h-24 object-cover border-2 border-[#424242]"
                    />
                  )}
                  <div>
                    <h3 className="font-bold text-sm sm:text-base">{actor.name}</h3>
                    <p className="text-xs sm:text-sm">as {actor.character}</p>
                    {actor.birthday && (
                      <p className="text-xs sm:text-sm">
                        Born: {new Date(actor.birthday).toLocaleDateString()}
                      </p>
                    )}
                    {actor.deathday && (
                      <p className="text-xs sm:text-sm text-red-600">
                        Died: {new Date(actor.deathday).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}