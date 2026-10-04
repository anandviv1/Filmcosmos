export default function MediaCard({ title, imageUrl }) {
  return (
    <article className="w-[88px] shrink-0 sm:w-[100px]">
      <div className="overflow-hidden rounded-sm border border-neutral-200 bg-neutral-100">
        <img
          src={imageUrl}
          alt=""
          className="aspect-square w-full object-cover"
          loading="lazy"
        />
      </div>
      <p className="mt-1.5 truncate text-center text-xs font-semibold text-black sm:text-sm">
        {title}
      </p>
    </article>
  );
}
