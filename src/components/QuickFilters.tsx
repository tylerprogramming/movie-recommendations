import React from 'react';

interface QuickFiltersProps {
  onFilterClick: (filter: string) => void;
}

export const QuickFilters: React.FC<QuickFiltersProps> = ({ onFilterClick }) => {
  const filters = [
    { label: '🎭 Drama', value: 'drama' },
    { label: '🧟 Horror', value: 'horror' },
    { label: '🌿 Feel Good', value: 'feel good' },
    { label: '🎬 Action', value: 'action' },
    { label: '🚀 Sci-Fi', value: 'sci-fi' },
    { label: '💚 Green', value: 'green' },
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-8">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterClick(filter.value)}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-full text-white 
                     transition-colors duration-200 text-sm font-medium"
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};