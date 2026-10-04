import ImdbBadge from './ImdbBadge';

export default function SearchBar({ onOpenFilters, activeFilterCount }) {
  return (
    <button
      type="button"
      onClick={onOpenFilters}
      className="flex w-full items-center gap-2 rounded-full border border-black bg-neutral-100 px-4 py-2.5 text-left text-sm text-neutral-600 shadow-sm transition hover:bg-neutral-50 sm:py-3 sm:text-base"
    >
      <svg
        className="h-5 w-5 shrink-0 text-neutral-800"
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
      <span className="min-w-0 flex-1 truncate leading-snug">
        Filter Movies/TV Series on <ImdbBadge /> Rating
        {activeFilterCount > 0 ? (
          <span className="ml-1 font-semibold text-fc-red">
            ({activeFilterCount} active)
          </span>
        ) : null}
      </span>
    </button>
  );
}
