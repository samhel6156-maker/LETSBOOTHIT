// src/components/booking/BoothSelectionPage.tsx
import { cn } from "@/lib/utils";
import { useBooking } from "./BookingContext";
import { Plus, Check } from "lucide-react";

function AddOnCard({
  title,
  description,
  price,
  added,
  onSelect,
}: {
  title: string;
  description: string;
  price?: number;
  added: boolean;
  onSelect: () => void;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/8 bg-[#201f1c] p-4">
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-white">{title}</h4>
        <p className="mt-0.5 text-xs text-gray-500">{description}</p>
        {price !== undefined && (
          <p className="mt-1 text-sm font-semibold text-amber-500">
            ₱{price.toLocaleString()}
          </p>
        )}
      </div>
      <button
        onClick={onSelect}
        className={cn(
          "flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
          added
            ? "border-amber-500/40 bg-amber-500 text-black"
            : "border-amber-500/20 bg-amber-500/15 text-amber-400 hover:bg-amber-500/25",
        )}
      >
        {added ? <Check className="size-3.5" /> : <Plus className="size-3.5" />}
        {added ? "Added" : "Add"}
      </button>
    </div>
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
      <div className="mt-4 flex flex-col gap-2">
        <AddOnCard
          title="Classic Booth"
          description="Includes a single backdrop for your whole event."
          added={state.boothType === "classic"}
          onSelect={() => setBoothType("classic")}
        />
        <AddOnCard
          title="Premium Booth"
          description="Curated set of fun, themed props — hats, glasses, signs, and more."
          price={1000}
          added={state.boothType === "premium"}
          onSelect={() => setBoothType("premium")}
        />
      </div>
    </div>
  );
}
