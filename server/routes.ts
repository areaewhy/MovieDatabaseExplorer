import type { Express } from "express";
import { createServer, type Server } from "http";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

if (!TMDB_API_KEY) {
  throw new Error("TMDB_API_KEY environment variable is required");
}

export function registerRoutes(app: Express): Server {
  app.get("/api/movies/search", async (req, res) => {
    const query = req.query.query as string;
    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Error fetching movies" });
    }
  });

  app.get("/api/movies/:id/credits", async (req, res) => {
    const movieId = req.params.id;
    
    try {
      // Get movie credits
      const creditsResponse = await fetch(
        `${TMDB_BASE_URL}/movie/${movieId}/credits?api_key=${TMDB_API_KEY}`
      );
      const creditsData = await creditsResponse.json();

      // Get detailed info for each cast member
      const castPromises = creditsData.cast.slice(0, 10).map(async (actor: any) => {
        const personResponse = await fetch(
          `${TMDB_BASE_URL}/person/${actor.id}?api_key=${TMDB_API_KEY}`
        );
        const personData = await personResponse.json();
        return {
          ...actor,
          birthday: personData.birthday,
          deathday: personData.deathday
        };
      });

      const cast = await Promise.all(castPromises);
      res.json(cast);
    } catch (error) {
      res.status(500).json({ message: "Error fetching movie credits" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
