import { useEffect, useState } from 'react';

export default function Carousel({ items }) {
  const [index, setIndex] = useState(0);
  const slides = items.length ? items : [{ title: 'Featured', posterUrl: '' }];

  useEffect(() => {
    if (slides.length <= 1) return undefined;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  const current = slides[index];

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-sm border border-neutral-200 bg-neutral-100">
        {current.posterUrl ? (
          <img
            src={current.posterUrl}
            alt={current.title}
            className="aspect-[16/9] w-full object-cover sm:aspect-[2/1]"
          />
        ) : (
          <div className="aspect-[16/9] w-full bg-neutral-200 sm:aspect-[2/1]" />
        )}
      </div>
      <div className="mt-3 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 rounded-full transition ${
              i === index ? 'bg-neutral-700' : 'bg-neutral-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
