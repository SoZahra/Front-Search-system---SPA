import { Search, X } from 'lucide-react';

const SearchBar = ({ searchTerm, onSearchChange, resultsCount, totalCount }) => {
  const handleClear = () => {
    onSearchChange('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Rechercher une transaction par label..."
          className="w-full pl-12 pr-12 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Effacer la recherche"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      {searchTerm && (
        <p className="text-sm text-gray-600 mt-2 ml-1">
          {resultsCount} résultat{resultsCount > 1 ? 's' : ''} sur {totalCount} transaction{totalCount > 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
};

export default SearchBar;