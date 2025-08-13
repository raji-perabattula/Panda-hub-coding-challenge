//Movies list types
export type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  vote_average: number;
  release_date: string;
};

//Movie details type
export type MovieDetails = Movie & {
  runtime: number;
  genres: { id: number; name: string }[];
  backdrop_path: string | null;
  homepage: string;
};

//Cast member type - carousel in movie details screen
export type Cast = {
  id: number;
  name: string;
  poster_path: string | null;
};

//Cinema data type - carousel in movie details screen
export type CinemaData = {
  id: number;
  name: string;
  image: string;
  overview: string;
}

export type MovieOrCast = Movie | Cast | CinemaData;