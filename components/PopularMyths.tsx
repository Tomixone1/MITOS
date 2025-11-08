import React from 'react';
import BookmarkIcon from './icons/BookmarkIcon';

interface PopularMythsProps {
  myths: string[];
  onMythClick: (myth: string) => void;
  isLoading: boolean;
}

const PopularMyths: React.FC<PopularMythsProps> = ({ myths, onMythClick, isLoading }) => {
  return (
    <div className="w-full my-4">
      <h2 className="text-3xl font-bold text-center mb-4 text-ink flex items-center justify-center gap-3">
        <BookmarkIcon className="w-7 h-7 text-sky" />
        Mitos Populares
      </h2>
      <div className="flex flex-wrap justify-center gap-3 p-4 bg-parchment border border-ink/10 rounded-lg shadow-lg">
        {myths.map((myth) => (
          <button
            key={myth}
            onClick={() => onMythClick(myth)}
            disabled={isLoading}
            className="px-4 py-2 bg-parchment-light text-sky rounded-full hover:bg-sky hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base border border-sky/30 hover:border-sky"
          >
            {myth}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PopularMyths;