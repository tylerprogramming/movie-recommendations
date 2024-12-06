import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar.tsx';
import { MovieGrid } from './components/MovieGrid';
import { MovieModal } from './components/MovieModal';
import { QuickFilters } from './components/QuickFilters';
import { Movie } from './types/movie';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleFilterClick = async (filter: string) => {
    setSearchQuery(filter);
    try {
      const formData = new FormData();
      formData.append('query', filter);
      
      const response = await fetch('http://localhost:5111/api/recommendations', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setMovies([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Movie Recommendations</h1>
          <p className="text-gray-400 text-lg mb-8">
            Discover your next favorite movie
          </p>
          
          <QuickFilters onFilterClick={handleFilterClick} />
          
          <div className="flex justify-center mb-12">
            <SearchBar
              onSearch={setMovies}
            />
          </div>
        </div>
        
        {movies.length > 0 && (
          <MovieGrid 
            movies={movies} 
            onMovieClick={(movie) => setSelectedMovie(movie)} 
          />
        )}
        
        {movies.length === 0 && (
          <div className="text-center text-gray-400 mt-12">
            <p>Enter your preferences to get movie recommendations</p>
          </div>
        )}
      </div>

      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}
    </div>
  );
}

export default App;