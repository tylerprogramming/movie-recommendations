import React from 'react';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <div 
      onClick={() => onClick(movie)}
      className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform 
                 hover:scale-105 cursor-pointer"
    >
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="w-full h-72 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{movie.title}</h3>
        <p className="text-gray-600">{movie.year}</p>
      </div>
    </div>
  );
};