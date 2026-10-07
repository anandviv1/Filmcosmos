export function filterCatalog(items, { mediaType, filters, query = '' }) {
  const minRating = filters.imdbRating ? Number(filters.imdbRating) : null;
  const q = query.trim().toLowerCase();

  return items.filter((item) => {
    if (mediaType && item.type !== mediaType) return false;
    if (minRating != null && item.imdbRating < minRating) return false;
    if (filters.actor && !item.actors?.includes(filters.actor)) return false;
    if (filters.genre && !item.genres?.includes(filters.genre)) return false;
    if (filters.year != null && item.year !== Number(filters.year)) return false;
    if (filters.yearFrom != null && item.year < Number(filters.yearFrom)) return false;
    if (filters.yearTo != null && item.year > Number(filters.yearTo)) return false;
    if (q && !item.title.toLowerCase().includes(q)) return false;
    return true;
  });
}

export function sortCatalog(items, sortBy) {
  const list = [...items];
  if (sortBy === 'rating') {
    return list.sort((a, b) => b.imdbRating - a.imdbRating);
  }
  if (sortBy === 'title') {
    return list.sort((a, b) => a.title.localeCompare(b.title));
  }
  return list.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
}
