export default function MediaTypeToggle({ value, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={() => onChange('movie')}
        className={
          value === 'movie'
            ? 'rounded-full bg-gradient-to-b from-[#ffb347] to-[#ffcc80] py-3 text-base font-semibold text-black shadow-md'
            : 'rounded-full border border-black bg-white py-3 text-base font-semibold text-black'
        }
      >
        Movies
      </button>
      <button
        type="button"
        onClick={() => onChange('tv')}
        className={
          value === 'tv'
            ? 'rounded-full bg-gradient-to-b from-[#ffb347] to-[#ffcc80] py-3 text-base font-semibold text-black shadow-md'
            : 'rounded-full border border-black bg-white py-3 text-base font-semibold text-black'
        }
      >
        TV Shows
      </button>
    </div>
  );
}
