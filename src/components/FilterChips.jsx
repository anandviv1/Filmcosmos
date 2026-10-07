import ImdbBadge from './ImdbBadge';

function Chip({ children, onRemove, imdb }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium ${
        imdb ? 'bg-[#f5c518]/30 text-black' : 'bg-neutral-100 text-neutral-800'
      }`}
    >
      {children}
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          className="ml-0.5 text-neutral-600 hover:text-black"
          aria-label="Remove filter"
        >
          ×
        </button>
      ) : null}
    </span>
  );
}

export default function FilterChips({ filters, onChange, onClearAll }) {
  const chips = [];

  if (filters.imdbRating != null) {
    chips.push({
      key: 'imdb',
      imdb: true,
      label: (
        <>
          <ImdbBadge /> {filters.imdbRating}+
        </>
      ),
      clear: () => onChange({ ...filters, imdbRating: null }),
    });
  }
  if (filters.actor) {
    chips.push({
      key: 'actor',
      label: filters.actor,
      clear: () => onChange({ ...filters, actor: null }),
    });
  }
  if (filters.genre) {
    chips.push({
      key: 'genre',
      label: filters.genre,
      clear: () => onChange({ ...filters, genre: null }),
    });
  }
  if (filters.yearFrom != null && filters.yearTo != null) {
    chips.push({
      key: 'yearRange',
      label: `${filters.yearFrom} - ${filters.yearTo}`,
      clear: () => onChange({ ...filters, yearFrom: null, yearTo: null }),
    });
  } else if (filters.year != null) {
    chips.push({
      key: 'year',
      label: String(filters.year),
      clear: () => onChange({ ...filters, year: null }),
    });
  }

  if (!chips.length) return null;

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
      <div className="flex min-w-0 flex-1 gap-2">
        {chips.map((chip) => (
          <Chip key={chip.key} imdb={chip.imdb} onRemove={chip.clear}>
            {chip.label}
          </Chip>
        ))}
      </div>
      <button
        type="button"
        onClick={onClearAll}
        className="shrink-0 text-sm font-semibold text-[#e85d04]"
      >
        Clear All
      </button>
    </div>
  );
}
