import { Cast, CinemaData } from "@/app/types/movie";

// Base URLs for images and API
export const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
export const API_BASE_URL = 'https://api.themoviedb.org/3';

//random user icon image and dummy banner for cinema
export const RANDOM_USER_IMAGE = 'https://randomuser.me/api/portraits/men/1.jpg';
export const CGV_BANNER = 'https://homepage.momocdn.net/cinema/momo-amazone-s3-api-240829164527-638605467276820522.png';

// Dummy data for cast for movie details screen
export const dummyCast: Cast[] = [
  {
    id: 1,
    name: "Tom Holland",
    poster_path: RANDOM_USER_IMAGE,
  },
  {
    id: 2,
    name: "Tobey Maguire",
    poster_path: RANDOM_USER_IMAGE,
  },
  {
    id: 3,
    name: "Andrew Garfield",
    poster_path:RANDOM_USER_IMAGE,
  },
];

// Dummy data for cinema for movie details screen
export const dummyCinemaData: CinemaData[]=[
  {
    id: 1,
    name: "HORTONO MALL CGV",
    image: CGV_BANNER,
    overview: "Lorem ipsum dolor sit amet.",
  },
  {
    id: 2,
    name: "CGV Aeon Mall",
    image: CGV_BANNER,
    overview: "Lorem ipsum dolor sit amet.",
  },
  {
    id: 3,
    name: "HORTONO MALL CGV",
    image: CGV_BANNER,
    overview: "Lorem ipsum dolor sit amet.",
  },
  {
    id: 4,
    name: "CGV Aeon Mall",
    image: CGV_BANNER,
    overview: "Lorem ipsum dolor sit amet.",
  },
  {
    id: 5,
    name: "CGV Aeon Mall",
    image: CGV_BANNER,
    overview: "Lorem ipsum dolor sit amet.",
  },
  {
    id: 4,
    name: "CGV Aeon Mall",
    image: CGV_BANNER,
    overview: "Lorem ipsum dolor sit amet.",
  },
  {
    id: 5,
    name: "CGV Aeon Mall",
    image: CGV_BANNER,
    overview: "Lorem ipsum dolor sit amet.",
  },
]