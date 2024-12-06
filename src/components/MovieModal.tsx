import React from 'react';
import { X } from 'lucide-react';
import { Movie } from '../types/movie';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 z-10"
        >
          <X size={24} />
        </button>
        
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-6 md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{movie.title}</h2>
            <p className="text-gray-600 mb-4">{movie.year}</p>
            
            {movie.rating && (
              <div className="mb-4">
                <span className="text-yellow-500">★</span>
                <span className="text-gray-700 ml-1">{movie.rating}</span>
              </div>
            )}
            
            {movie.genre && (
              <div className="mb-4">
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {movie.genre}
                </span>
              </div>
            )}
            
            {movie.description && (
              <p className="text-gray-600 leading-relaxed">{movie.description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};