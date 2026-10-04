export default function Logo({ compact = false }) {
  return (
    <div
      className={`flex items-center gap-2 ${compact ? 'justify-start' : 'justify-center'}`}
    >
      <span className="relative flex h-7 w-8 shrink-0 items-end justify-center">
        <span
          className="absolute bottom-0 left-0 h-0 w-0 border-b-[14px] border-l-[10px] border-r-[10px] border-b-violet-500 border-l-transparent border-r-transparent"
          aria-hidden
        />
        <span
          className="absolute bottom-0 left-1/2 h-0 w-0 -translate-x-1/2 border-b-[16px] border-l-[11px] border-r-[11px] border-b-emerald-500 border-l-transparent border-r-transparent opacity-90"
          aria-hidden
        />
        <span
          className="absolute bottom-0 right-0 h-0 w-0 border-b-[12px] border-l-[9px] border-r-[9px] border-b-amber-400 border-l-transparent border-r-transparent"
          aria-hidden
        />
      </span>
      <span
        className={`font-serif font-bold tracking-tight text-black ${compact ? 'text-xl' : 'text-2xl sm:text-3xl'}`}
      >
        Filmcosmos
      </span>
    </div>
  );
}
