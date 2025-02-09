import type { Actor } from "../types/tmdb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users } from "lucide-react";

interface ActorListProps {
  actors: Actor[];
}

export function ActorList({ actors }: ActorListProps) {
  return (
    <Card className="bg-[#C3C7CB] border-[#424242]">
      <CardHeader className="bg-[#000080] text-white p-2 flex flex-row items-center space-y-0">
        <Users className="h-4 w-4 mr-2" />
        <CardTitle className="text-sm font-normal">Cast Members</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {actors.map((actor) => (
              <div 
                key={actor.id} 
                className="bg-[#FFFFFF] p-3 border-t-[#FFFFFF] border-l-[#FFFFFF] border-b-[#424242] border-r-[#424242] border-2"
              >
                <div className="flex gap-3">
                  {actor.profile_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                      alt={actor.name}
                      className="w-16 h-24 object-cover border-2 border-[#424242]"
                    />
                  )}
                  <div>
                    <h3 className="font-bold">{actor.name}</h3>
                    <p className="text-sm">as {actor.character}</p>
                    {actor.birthday && (
                      <p className="text-sm">
                        Born: {new Date(actor.birthday).toLocaleDateString()}
                      </p>
                    )}
                    {actor.deathday && (
                      <p className="text-sm">
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
