import type { Movie } from "../types/movie";
import MovieCard from "./movie-card";

interface MovieGridProps {
  movies: Movie[];
  showBookmark?: boolean;
}

function MovieGrid({ movies, showBookmark }: MovieGridProps) {
  return (
    <div className="grid w-full grid-cols-5 gap-x-[18px] gap-y-[21px]">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} showBookmark={showBookmark} />
      ))}
    </div>
  );
}

export default MovieGrid;
