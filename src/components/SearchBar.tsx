import React, { useState } from 'react';
import { Search, Image, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (data: any) => void;
  value?: string;
  onChange?: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="w-full">
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
      </form>
      
      {imagePreview && (
        <div className="mt-4 relative inline-block">
          <img 
            src={imagePreview} 
            alt="Preview" 
            className="max-h-40 rounded-lg shadow-lg"
          />
          <button
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 p-1 bg-red-500 rounded-full 
                       text-white hover:bg-red-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};