import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FilterChips from '../components/FilterChips';
import Logo from '../components/Logo';
import ResultListItem from '../components/ResultListItem';
import { searchCatalog } from '../data/searchResults';
import { emptyFilters } from '../hooks/useFilteredMedia';
import { filterCatalog, sortCatalog } from '../hooks/filterCatalog';

export default function ResultsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const initial = location.state ?? {};

  const [filters, setFilters] = useState(initial.filters ?? emptyFilters);
  const [mediaType] = useState(initial.mediaType ?? 'movie');
  const [searchQuery, setSearchQuery] = useState(initial.searchQuery ?? '');
  const [sortBy, setSortBy] = useState('latest');

  const results = useMemo(() => {
    const filtered = filterCatalog(searchCatalog, {
      mediaType,
      filters,
      query: searchQuery,
    });
    return sortCatalog(filtered, sortBy);
  }, [filters, mediaType, searchQuery, sortBy]);

  const resultCount = results.length;

  const handleClearAll = () => {
    setFilters(emptyFilters);
    setSearchQuery('');
  };

  const handleBack = () => {
    navigate('/');
  };

  if (!location.state) {
    return (
      <div className="mx-auto max-w-md px-4 py-12 text-center sm:max-w-lg">
        <p className="text-neutral-600">No filters applied.</p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mt-4 font-semibold text-[#e85d04]"
        >
          Back to home
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-dvh max-w-md border-x border-violet-300/80 bg-white sm:max-w-lg">
      <header className="border-b border-neutral-100 px-4 pb-3 pt-4">
        <div className="relative flex items-center justify-center">
          <button
            type="button"
            onClick={handleBack}
            className="absolute left-0 flex h-10 w-10 items-center justify-center text-2xl text-black"
            aria-label="Back"
          >
            ‹
          </button>
          <Logo compact />
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2.5">
          <svg
            className="h-5 w-5 shrink-0 text-neutral-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movies or TV shows..."
            className="min-w-0 flex-1 bg-transparent text-sm text-black outline-none placeholder:text-neutral-400"
          />
        </div>

        <div className="mt-3">
          <FilterChips
            filters={filters}
            onChange={setFilters}
            onClearAll={handleClearAll}
          />
        </div>
      </header>

      <div className="flex items-center justify-between px-4 py-3">
        <p className="text-sm font-medium text-neutral-700">
          <span className="font-bold text-black">{resultCount}</span> results
        </p>
        <label className="flex items-center gap-1 text-sm text-neutral-600">
          Sort by
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="font-semibold text-black outline-none"
          >
            <option value="latest">Latest</option>
            <option value="rating">Rating</option>
            <option value="title">Title</option>
          </select>
        </label>
      </div>

      <main className="px-4 pb-10">
        {results.length === 0 ? (
          <p className="py-8 text-center text-sm text-neutral-500">
            No titles match your filters. Try clearing a chip or go back to change
            filters.
          </p>
        ) : (
          <ul className="list-none p-0">
            {results.map((item) => (
              <li key={item.id}>
                <ResultListItem item={item} />
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
