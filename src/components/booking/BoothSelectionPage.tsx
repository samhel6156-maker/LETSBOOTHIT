// src/components/booking/BoothSelectionPage.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBooking } from "./BookingContext";
import { StepProgress } from "./StepProgress";
import { OrderSummary } from "./OrderSummary";
import { PACKAGES } from "./BookingPage";

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
  const navigate = useNavigate();
  const { state, setBoothType } = useBooking();
  const pkg = PACKAGES.find((p) => p.value === state.packageId);

  useEffect(() => {
    if (!pkg) navigate("/booking");
  }, [pkg, navigate]);

  if (!pkg) return null;

  return (
    <div className="min-h-screen bg-[#1b1b18] pb-24 lg:pb-16">
      <div className="sticky top-0 z-20 border-b border-white/8 bg-[#1b1b18]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-[1152px] items-center justify-between px-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>
          <p className="font-serif text-lg italic font-bold text-white">
            Let&apos;s <span className="text-amber-500">Booth</span> It
          </p>
          <div className="w-[112px]" />
        </div>
      </div>

      <div className="mx-auto max-w-[1152px] px-6 py-8">
        <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-[#201f1c] px-4 py-3">
          <div className="flex items-center gap-3">
            <img
              src={pkg.image}
              alt={pkg.name}
              className="size-10 rounded-xl object-cover"
            />
            <div>
              <p className="text-[11px] uppercase tracking-wide text-gray-500">
                Selected Package
              </p>
              <p className="font-serif text-sm italic font-semibold text-white">
                {pkg.name}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate(`/booking/package/${pkg.value}`)}
            className="rounded-lg px-3 py-1.5 text-xs font-semibold text-amber-500 hover:bg-white/5"
          >
            Change
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-10 lg:flex-row">
          <div className="flex-1">
            <StepProgress currentStep={1} />

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.15em] text-amber-500">
              Step 2 of 5
            </p>
            <h1 className="mt-1 font-serif text-3xl italic text-white">
              Choose your Booth.
            </h1>

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

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => navigate(`/booking/package/${pkg.value}`)}
                className="flex-1 rounded-xl border border-white/20 py-2.5 text-sm font-semibold text-white hover:bg-white/5"
              >
                Back
              </button>
              <button
                onClick={() => navigate("/booking/event")}
                className="min-w-[160px] rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-black hover:bg-amber-400"
              >
                Next: Event Details
              </button>
            </div>
          </div>

          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
