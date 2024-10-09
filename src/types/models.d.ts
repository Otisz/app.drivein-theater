declare type Movie = {
  id: string;
  title: string;
  description: string;
  ageRating: 0 | 6 | 12 | 16 | 18;
  language: string;
  coverImage: string;
  createdAt: string;
  updatedAt: string;
};

declare type Agenda = {
  id: string;
  seats: number;
  startDate: string;
  movie: Movie;
  createdAt: string;
  updatedAt: string;
};
