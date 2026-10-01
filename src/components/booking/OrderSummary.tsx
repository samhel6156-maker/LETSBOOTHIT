// src/components/booking/OrderSummary.tsx
import { useState } from "react";
import { Receipt, ChevronUp, ChevronDown } from "lucide-react";
import { useBooking } from "./BookingContext";
import { PACKAGES } from "./BookingPage";

const INCLUDED_ITEMS = [
  "Free Transportation within Quezon City",
  "Unlimited Shots",
  "1 Backdrop",
  "1-2 Booth Attendant",
  "Fun Props",
  "Customized Photo Layout",
];

const PROMO_PACKAGES = ["package_8", "package_9", "package_11"];

function SummaryLines() {
  const { state, total } = useBooking();
  const pkg = PACKAGES.find((p) => p.value === state.packageId);

  return (
    <>
      <div className="flex items-center justify-between py-2">
        <p className="text-sm font-semibold text-white">{pkg?.name ?? "—"}</p>
        <p className="text-sm font-semibold text-white">
          {pkg ? `₱${pkg.price.toLocaleString()}` : "—"}
        </p>
      </div>

      {INCLUDED_ITEMS.map((item) => (
        <div key={item} className="flex items-center justify-between py-1.5">
          <p className="text-xs text-gray-500">{item}</p>
          <p className="text-xs text-gray-400">Included</p>
        </div>
      ))}

      {state.boothType === "premium" && (
        <div className="flex items-center justify-between py-1.5">
          <p className="text-xs text-gray-400">Premium Booth</p>
          <p className="text-xs text-gray-300">+₱{(1000).toLocaleString()}</p>
        </div>
      )}

      {pkg && PROMO_PACKAGES.includes(pkg.value) && (
        <div className="flex items-center justify-between py-1.5">
          <p className="text-xs font-medium text-amber-500">
            Promo: +1 hr if you book today
          </p>
          <p className="text-xs text-amber-400">Free</p>
        </div>
      )}

      <div className="mt-3 flex items-center justify-between border-t border-white/8 pt-3">
        <p className="text-sm font-bold text-white">Total</p>
        <p className="text-lg font-bold text-amber-400">
          {pkg ? `₱${total.toLocaleString()}` : "—"}
        </p>
      </div>
    </>
  );
}

export function OrderSummary() {
  const { total } = useBooking();
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* Desktop: static sidebar */}
      <div className="hidden w-full shrink-0 self-start rounded-2xl border border-white/10 bg-[#201f1c] p-5 lg:block lg:w-[320px]">
        <div className="flex items-center gap-2">
          <Receipt className="size-4 text-white" />
          <p className="text-sm font-bold uppercase tracking-wide text-white">
            Order Summary
          </p>
        </div>
        <div className="mt-4">
          <SummaryLines />
        </div>
      </div>

      {/* Mobile: sticky collapsible bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#201f1c] lg:hidden">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex w-full items-center justify-between px-4 py-3"
        >
          <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-amber-500">
            <Receipt className="size-4" />
            Order Summary
          </span>
          <span className="flex items-center gap-2">
            <span className="text-base font-bold text-amber-400">
              ₱{total.toLocaleString()}
            </span>
            {expanded ? (
              <ChevronUp className="size-4 text-gray-400" />
            ) : (
              <ChevronDown className="size-4 text-gray-400" />
            )}
          </span>
        </button>
        {expanded && (
          <div className="max-h-[50vh] overflow-y-auto border-t border-white/8 px-4 pb-4">
            <SummaryLines />
          </div>
        )}
      </div>
    </>
  );
}
