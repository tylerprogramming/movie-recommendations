import React, { useState } from 'react';
import { Search, Image } from 'lucide-react';

export const SearchBar = ({ onSearch = (data) => console.log(data) }) => {
  const [query, setQuery] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('query', query);
    if (image) {
      formData.append('image', image);
    }
    
    try {
      const response = await fetch('http://localhost:5111/api/recommendations', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      onSearch(data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe the type of movie you're looking for..."
          className="w-full px-6 py-4 text-lg bg-white rounded-full shadow-lg 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12
                     text-gray-800 placeholder-gray-500"
        />
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <div className="p-4 bg-white rounded-full shadow-lg text-gray-500 hover:text-blue-500">
            <Image size={24} />
          </div>
        </label>
        <button
          type="submit"
          className="p-4 bg-white rounded-full shadow-lg text-gray-500 
                     hover:text-blue-500 transition-colors"
        >
          <Search size={24} />
        </button>
      </div>
      {image && (
        <div className="mt-2 text-sm text-gray-300">
          Image selected: {image.name}
        </div>
      )}
    </form>
  );
}; 