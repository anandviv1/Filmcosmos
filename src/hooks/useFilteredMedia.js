import { useMemo } from 'react';

export function useFilteredMedia(items, { mediaType, filters }) {
  return useMemo(() => {
    const minRating = filters.imdbRating ? Number(filters.imdbRating) : null;

    return items.filter((item) => {
      if (item.type !== mediaType) return false;
      if (minRating != null && item.imdbRating < minRating) return false;
      if (filters.actor && !item.actors?.includes(filters.actor)) return false;
      if (filters.genre && !item.genres?.includes(filters.genre)) return false;
      if (filters.year != null && item.year !== Number(filters.year)) return false;
      if (filters.yearFrom != null && item.year < Number(filters.yearFrom)) return false;
      if (filters.yearTo != null && item.year > Number(filters.yearTo)) return false;
      return true;
    });
  }, [items, mediaType, filters]);
}

export const emptyFilters = {
  imdbRating: null,
  actor: null,
  genre: null,
  year: null,
  yearFrom: null,
  yearTo: null,
};
