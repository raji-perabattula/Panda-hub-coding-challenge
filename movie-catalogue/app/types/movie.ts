export type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  vote_average: number;
  release_date: string;
};

export type MovieDetails = Movie & {
  runtime: number;
  genres: { id: number; name: string }[];
  backdrop_path: string | null;
  homepage: string;
};

export type Cast = {
  id: number;
  name: string;
  poster_path: string | null;
};

export type CinemaData = {
  id: number;
  name: string;
  image: string;
  overview: string;
}

export type CastMember ={
  id: number;
  name: string;
  poster_path: string;
}
export type MovieOrCast = Movie | Cast | CinemaData;