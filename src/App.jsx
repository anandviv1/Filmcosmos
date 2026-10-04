import { useMemo, useState } from 'react';
import Carousel from './components/Carousel';
import FilterModal from './components/FilterModal';
import Logo from './components/Logo';
import MediaSection from './components/MediaSection';
import MediaTypeToggle from './components/MediaTypeToggle';
import SearchBar from './components/SearchBar';
import { mediaItems, myListCards } from './data/mockMedia';
import { emptyFilters, useFilteredMedia } from './hooks/useFilteredMedia';

function countActiveFilters(filters) {
  return Object.values(filters).filter((v) => v != null && v !== '').length;
}

export default function App() {
  const [mediaType, setMediaType] = useState('movie');
  const [filters, setFilters] = useState(emptyFilters);
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useFilteredMedia(mediaItems, { mediaType, filters });

  const featured = useMemo(
    () => filtered.filter((item) => item.featured),
    [filtered],
  );

  const carouselItems = featured.length
    ? featured
    : filtered.slice(0, 5);

  const newReleases = useMemo(
    () => filtered.filter((item) => item.tags?.includes('new')),
    [filtered],
  );

  const trending = useMemo(
    () => filtered.filter((item) => item.tags?.includes('trending')),
    [filtered],
  );

  const myList = useMemo(() => {
    if (mediaType !== 'movie') {
      return filtered.filter((item) => item.tags?.includes('mylist'));
    }
    const listFiltered = filtered.filter((item) => item.tags?.includes('mylist'));
    if (listFiltered.length >= 4) return listFiltered.slice(0, 4);
    return myListCards.map((card) => ({
      id: card.id,
      title: card.label,
      listLabel: card.label,
      posterUrl: card.posterUrl,
    }));
  }, [filtered, mediaType]);

  const activeFilterCount = countActiveFilters(filters);

  return (
    <div className="mx-auto min-h-dvh max-w-md border-x border-violet-300/80 bg-white px-4 pb-10 pt-6 sm:max-w-lg">
      <header className="mb-5">
        <Logo />
        <div className="mt-5">
          <SearchBar
            onOpenFilters={() => setFilterOpen(true)}
            activeFilterCount={activeFilterCount}
          />
        </div>
        <div className="mt-4">
          <MediaTypeToggle value={mediaType} onChange={setMediaType} />
        </div>
      </header>

      <main>
        <Carousel items={carouselItems} />

        <MediaSection title="My List" items={myList} emptyMessage="Nothing in your list for these filters." />

        <MediaSection
          title="New Releases"
          items={newReleases.length ? newReleases : filtered.slice(0, 4)}
          emptyMessage="No new releases match your filters."
        />

        <MediaSection
          title="Trending Now"
          items={trending.length ? trending : filtered.slice(0, 4)}
          emptyMessage="Nothing trending matches your filters."
        />
      </main>

      <FilterModal
        open={filterOpen}
        appliedFilters={filters}
        onClose={() => setFilterOpen(false)}
        onApply={(next) => {
          setFilters(next);
          setFilterOpen(false);
        }}
      />
    </div>
  );
}
