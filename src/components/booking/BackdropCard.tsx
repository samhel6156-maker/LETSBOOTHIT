// src/components/booking/BackdropCard.tsx
import { cn } from "@/lib/utils";

export function BackdropCard({
  image,
  label,
  priceLabel,
  selected,
  disabled,
  onSelect,
}: {
  image: string;
  label: string;
  priceLabel: string;
  selected: boolean;
  disabled?: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      className={cn(
        "group relative overflow-hidden rounded-xl border text-left transition-colors",
        disabled && "opacity-40 cursor-not-allowed border-white/8",
        !disabled && selected && "border-amber-500",
        !disabled && !selected && "border-white/10 hover:border-white/25",
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-[#2a2926]">
        <img src={image} alt={label} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        {selected && (
          <span className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-amber-500">
            <svg
              viewBox="0 0 16 16"
              className="size-3 fill-none stroke-black stroke-[2.5]"
            >
              <path
                d="M3 8.5l3 3 7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
        {disabled && (
          <span className="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-gray-300">
            Not Available
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-2.5">
          <p className="text-sm font-semibold text-white">{label}</p>
          <p className="text-xs text-gray-300">{priceLabel}</p>
        </div>
      </div>
    </button>
  );
}
