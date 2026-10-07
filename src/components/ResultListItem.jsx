import ImdbBadge from './ImdbBadge';

export default function ResultListItem({ item }) {
  const genre = item.genres?.[0] ?? '';

  return (
    <article className="flex gap-3 border-b border-neutral-100 py-4">
      <img
        src={item.posterUrl}
        alt=""
        className="h-[120px] w-[82px] shrink-0 rounded-lg object-cover bg-neutral-200"
        loading="lazy"
      />
      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-bold leading-tight text-black">{item.title}</h3>
        <p className="mt-1 flex flex-wrap items-center gap-x-2 text-sm text-neutral-600">
          <span className="inline-flex items-center gap-0.5">
            <ImdbBadge />
            <span className="font-semibold text-black">{item.imdbRating}</span>
          </span>
          <span aria-hidden>·</span>
          <span>{item.year}</span>
          {item.runtime ? (
            <>
              <span aria-hidden>·</span>
              <span>{item.runtime}</span>
            </>
          ) : null}
          {genre ? (
            <>
              <span aria-hidden>·</span>
              <span>{genre}</span>
            </>
          ) : null}
        </p>
        {item.overview ? (
          <p className="mt-2 line-clamp-2 text-sm leading-snug text-neutral-500">
            {item.overview}
          </p>
        ) : null}
      </div>
      <button
        type="button"
        className="flex h-9 w-9 shrink-0 items-center justify-center self-start rounded-full border border-neutral-300 text-xl text-neutral-700"
        aria-label={`Add ${item.title} to list`}
      >
        +
      </button>
    </article>
  );
}
