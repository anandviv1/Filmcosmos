import MediaCard from './MediaCard';

export default function MediaSection({ title, items, emptyMessage }) {
  if (!items.length) {
    return (
      <section className="mt-6">
        <h2 className="mb-3 text-lg font-bold text-black">{title}</h2>
        <p className="text-sm text-neutral-500">{emptyMessage}</p>
      </section>
    );
  }

  return (
    <section className="mt-6">
      <h2 className="mb-3 text-lg font-bold text-black">{title}</h2>
      <div className="scrollbar-hide -mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
        {items.map((item) => (
          <MediaCard
            key={item.id}
            title={item.listLabel ?? item.title}
            imageUrl={item.posterUrl}
          />
        ))}
      </div>
    </section>
  );
}
