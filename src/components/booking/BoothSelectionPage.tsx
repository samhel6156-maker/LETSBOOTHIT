// src/components/booking/BoothSelectionPage.tsx
import { cn } from "@/lib/utils";
import { useBooking } from "./BookingContext";
import { Check } from "lucide-react";

function BoothCard({
  image,
  title,
  description,
  priceLabel,
  selected,
  onSelect,
}: {
  image: string;
  title: string;
  description: string;
  priceLabel: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border text-left transition-colors",
        selected
          ? "border-amber-500"
          : "border-white/8 hover:border-amber-600/50",
      )}
    >
      <div className="relative h-[180px] w-full overflow-hidden bg-[#2a2926] sm:h-[220px]">
        <img src={image} alt={title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
        {selected && (
          <span className="absolute right-3 top-3 flex size-6 items-center justify-center rounded-full bg-amber-500">
            <Check className="size-3.5 text-black" strokeWidth={3} />
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2 bg-transparent p-4">
        <h3 className="font-serif text-lg italic font-semibold text-white">
          {title}
        </h3>
        <p className="text-xs text-gray-500">{description}</p>
        <p className="text-sm font-semibold text-amber-500">{priceLabel}</p>
      </div>
    </button>
  );
}

export default function BoothSelectionPage() {
  const { state, setBoothType } = useBooking();

  return (
    <div className="mt-5 rounded-2xl border border-white/8 bg-[#201f1c] p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-white">
          Choose your Booth
        </h3>
        <span className="rounded-full bg-white/8 px-2.5 py-1 text-xs text-gray-500">
          Choose one
        </span>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <BoothCard
          image="/Photobooth photos/Lets Booth it Photos/Photobooth setups/Classic Setup.png"
          title="Classic Booth"
          description="Includes a single backdrop for your whole event."
          priceLabel="Included"
          selected={state.boothType === "classic"}
          onSelect={() => setBoothType("classic")}
        />
        <BoothCard
          image="/Photobooth photos/Lets Booth it Photos/Photobooth setups/Premium Setup.png"
          title="Premium Booth"
          description="Curated set of fun, themed props — hats, glasses, signs, and more."
          priceLabel="+₱1,000"
          selected={state.boothType === "premium"}
          onSelect={() => setBoothType("premium")}
        />
      </div>
    </div>
  );
}
