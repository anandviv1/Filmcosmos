import { useEffect, useState } from 'react';
import Logo from './Logo';
import { ACTORS, GENRES } from '../data/mockMedia';

const CATEGORIES = [
  { id: 'imdbRating', label: 'Imdb Rating' },
  { id: 'actor', label: 'Actor' },
  { id: 'genre', label: 'Gener' },
  { id: 'year', label: 'Year' },
];

const RATING_OPTIONS = [2, 3, 4, 5, 6, 7, 8];
const YEAR_OPTIONS = [2024, 2023, 2022, 2021, 2020];

function RadioRow({ label, checked, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex w-full items-center gap-3 border-b border-neutral-200 py-3.5 text-left text-base text-neutral-800"
    >
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
          checked ? 'border-[#f5a623]' : 'border-neutral-400'
        }`}
        aria-hidden
      >
        {checked ? <span className="h-3 w-3 rounded-full bg-[#f5a623]" /> : null}
      </span>
      <span>{label}</span>
    </button>
  );
}

export default function FilterModal({ open, appliedFilters, onClose, onApply }) {
  const [category, setCategory] = useState('imdbRating');
  const [draft, setDraft] = useState(appliedFilters);

  useEffect(() => {
    if (open) setDraft(appliedFilters);
  }, [open, appliedFilters]);

  if (!open) return null;

  const setField = (key, value) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const clearAll = () => {
    setDraft({
      imdbRating: null,
      actor: null,
      genre: null,
      year: null,
    });
  };

  const renderOptions = () => {
    if (category === 'imdbRating') {
      return RATING_OPTIONS.map((n) => (
        <RadioRow
          key={n}
          label={`${n}+`}
          checked={draft.imdbRating === n}
          onSelect={() =>
            setField('imdbRating', draft.imdbRating === n ? null : n)
          }
        />
      ));
    }
    if (category === 'actor') {
      return ACTORS.map((name) => (
        <RadioRow
          key={name}
          label={name}
          checked={draft.actor === name}
          onSelect={() => setField('actor', draft.actor === name ? null : name)}
        />
      ));
    }
    if (category === 'genre') {
      return GENRES.map((name) => (
        <RadioRow
          key={name}
          label={name}
          checked={draft.genre === name}
          onSelect={() => setField('genre', draft.genre === name ? null : name)}
        />
      ));
    }
    if (category === 'year') {
      return YEAR_OPTIONS.map((y) => (
        <RadioRow
          key={y}
          label={String(y)}
          checked={draft.year === y}
          onSelect={() => setField('year', draft.year === y ? null : y)}
        />
      ));
    }
    return null;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="filter-title"
    >
      <div className="flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl bg-white shadow-xl sm:max-h-[85dvh] sm:rounded-2xl sm:border sm:border-violet-300">
        <div className="border-b border-neutral-200 px-4 py-4">
          <Logo compact />
        </div>

        <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
          <h2 id="filter-title" className="text-lg font-bold text-black">
            Filters
          </h2>
          <button
            type="button"
            onClick={clearAll}
            className="text-base font-medium text-fc-red"
          >
            Clear All
          </button>
        </div>

        <div className="flex min-h-0 flex-1">
          <nav className="w-[38%] shrink-0 border-r border-neutral-200 bg-neutral-100">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`block w-full border-b border-neutral-200/80 px-3 py-4 text-left text-sm font-medium sm:text-base ${
                  category === cat.id
                    ? 'bg-white text-black'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={`pad-${i}`}
                className="h-12 border-b border-neutral-200/60 bg-neutral-100"
                aria-hidden
              />
            ))}
          </nav>
          <div className="min-h-0 flex-1 overflow-y-auto px-4">{renderOptions()}</div>
        </div>

        <div className="flex items-center justify-between border-t border-neutral-200 px-4 py-4">
          <button
            type="button"
            onClick={onClose}
            className="text-base font-medium text-black"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => onApply(draft)}
            className="text-base font-semibold text-fc-red"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
