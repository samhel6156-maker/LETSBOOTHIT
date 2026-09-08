// src/components/booking/ConfirmationPage.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBooking } from "./BookingContext";
import { StepProgress } from "./StepProgress";
import { PACKAGES } from "./BookingPage";

const NEXT_STEPS = [
  {
    num: "1",
    title: "Confirmation email",
    desc: "You'll receive a booking summary at your email address.",
  },
  {
    num: "2",
    title: "We reach out within 24 hours",
    desc: "Our team will contact you to confirm availability and details.",
  },
  {
    num: "3",
    title: "Finalize & secure your date",
    desc: "Pay the booking deposit to lock in your event date.",
  },
];

export default function ConfirmationPage() {
  const navigate = useNavigate();
  const { state, total, resetBooking } = useBooking();
  const pkg = PACKAGES.find((p) => p.value === state.packageId);

  useEffect(() => {
    if (!state.confirmationRef) navigate("/booking");
  }, [state.confirmationRef, navigate]);

  if (!state.confirmationRef || !pkg) return null;

  const boothLabel =
    state.boothType === "premium" ? "Premium Booth" : "Classic Booth";
  const eventDateTime =
    state.eventDate && state.startTime
      ? `${state.eventDate} at ${state.startTime}`
      : "";

  const handleBookAnother = () => {
    resetBooking();
    navigate("/booking");
  };

  return (
    <div className="min-h-screen bg-[#1b1b18] pb-16">
      <div className="sticky top-0 z-20 border-b border-white/8 bg-[#1b1b18]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-[1152px] items-center justify-between px-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white"
          >
            <span className="hidden sm:inline">Back to Home</span>
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
        </div>

        <div className="mt-6 max-w-[744px]">
          <StepProgress currentStep={4} />

          {/* Success card */}
          <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-[#201f1c]">
            <div className="relative p-8 text-center">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-amber-500/8 blur-[60px]" />
              </div>

              <div className="relative mx-auto mb-5 inline-flex size-20 items-center justify-center rounded-full border-2 border-amber-500/30 bg-amber-500/15">
                <CheckCircle2 className="size-9 text-amber-400" />
              </div>

              <h1 className="mb-2 font-serif text-3xl italic text-white">
                You&apos;re all set!
              </h1>
              <p className="mx-auto max-w-sm text-sm leading-relaxed text-gray-400">
                Thanks,{" "}
                <span className="font-semibold text-white">
                  {state.fullName}
                </span>
                ! Your booking request is in. We&apos;ll confirm everything at{" "}
                <span className="text-amber-400">{state.email}</span> within 24
                hours.
              </p>

              <div className="relative mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2">
                <span className="text-xs text-gray-500">Booking Reference</span>
                <span className="font-mono text-sm font-bold tracking-wider text-amber-400">
                  {state.confirmationRef}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/8 bg-white/2 p-5">
              <div>
                <p className="mb-1 text-[11px] uppercase tracking-wide text-gray-500">
                  Package
                </p>
                <p className="font-serif font-semibold italic text-white">
                  {boothLabel}
                </p>
                {eventDateTime && (
                  <p className="mt-0.5 text-xs text-gray-500">
                    {eventDateTime}
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="mb-1 text-[11px] uppercase tracking-wide text-gray-500">
                  Estimated Total
                </p>
                <p className="text-xl font-bold text-amber-400">
                  ₱{total.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* What happens next */}
          <div className="mt-6 rounded-2xl border border-white/8 bg-[#201f1c] p-5">
            <p className="mb-4 text-xs uppercase tracking-wide text-gray-500">
              What happens next
            </p>
            <div className="flex flex-col gap-4">
              {NEXT_STEPS.map(({ num, title, desc }) => (
                <div key={num} className="flex gap-4">
                  <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/20">
                    <span className="text-xs font-bold text-amber-400">
                      {num}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-gray-500">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="flex-1 rounded-full py-3.5"
            >
              Back to Home
            </Button>
            <button
              onClick={handleBookAnother}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-amber-500 py-3.5 text-sm font-bold text-black transition-colors hover:bg-amber-400"
            >
              Book Another Event
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
