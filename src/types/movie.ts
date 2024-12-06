export interface Movie {
  id: string;
  title: string;
  year: number;
  posterUrl: string;
  description?: string;
  rating?: string;
  genre?: string;
}