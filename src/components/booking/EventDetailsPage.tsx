// src/components/booking/EventDetailsPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useBooking } from "./BookingContext";
import { StepProgress } from "./StepProgress";
import { OrderSummary } from "./OrderSummary";
import { PACKAGES } from "./BookingPage";

const EVENT_TYPES = [
  { value: "", label: "Select event type" },
  { value: "Wedding", label: "Wedding" },
  { value: "Birthday Party", label: "Birthday / Debut" },
  { value: "Corporate Event", label: "Corporate Event" },
  { value: "Debut", label: "Debut" },
  { value: "Christening", label: "Christening" },
  { value: "Other", label: "Other" },
];

function FieldError({ show, message }: { show: boolean; message: string }) {
  if (!show) return null;
  return <p className="mt-1.5 text-xs text-red-400">{message}</p>;
}

function formatDateDisplay(value: string): string {
  if (!value) return "";
  const d = new Date(`${value}T00:00:00`);
  return d.toLocaleDateString("en-PH", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatTimeDisplay(value: string): string {
  if (!value) return "";
  const [h, m] = value.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const displayH = h % 12 === 0 ? 12 : h % 12;
  return `${displayH}:${String(m).padStart(2, "0")} ${period}`;
}

function PickerTile({
  icon,
  display,
  placeholder,
  hasError,
  children,
}: {
  icon: React.ReactNode;
  display: string;
  placeholder: string;
  hasError: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative flex h-12 items-center justify-between gap-3 rounded-xl border bg-[#2a2926] px-4 transition-colors hover:border-white/25 focus-within:border-amber-500/50 focus-within:ring-2 focus-within:ring-amber-500/30",
        hasError ? "border-red-500/50" : "border-white/10",
      )}
    >
      <p
        className={cn(
          "min-w-0 flex-1 truncate text-sm",
          display ? "text-white" : "text-gray-500",
        )}
      >
        {display || placeholder}
      </p>
      <span className="shrink-0 text-gray-400">{icon}</span>
      {children}
    </div>
  );
}

function getTodayLocal(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function EventDetailsPage() {
  const navigate = useNavigate();
  const { state, updateEventDetails } = useBooking();
  const pkg = PACKAGES.find((p) => p.value === state.packageId);
  const [attempted, setAttempted] = useState(false);

  useEffect(() => {
    if (!pkg) navigate("/booking");
  }, [pkg, navigate]);

  if (!pkg) return null;

  const today = getTodayLocal();
  const errors = {
    eventDate: !state.eventDate
      ? "Please select an event date."
      : state.eventDate < today
        ? "Please select today or a future date."
        : "",
    startTime: !state.startTime ? "Please choose a start time." : "",
    eventType: !state.eventType ? "Please select an event type." : "",
    venue: !state.venue.trim() ? "Please enter your venue or address." : "",
  };

  const isValid = !Object.values(errors).some(Boolean);

  const inputError = (field: keyof typeof errors) =>
    attempted && !!errors[field]
      ? "border-red-500/50 focus-visible:ring-red-500/30"
      : "";

  const handleNext = () => {
    setAttempted(true);
    if (isValid) navigate("/booking/details");
  };

  return (
    <div className="min-h-screen bg-[#1b1b18] pb-24 lg:pb-16">
      <div className="sticky top-0 z-20 border-b border-white/8 bg-[#1b1b18]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-[1152px] items-center justify-between px-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
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
          <button
            onClick={() => navigate(`/booking/package/${pkg.value}`)}
            className="rounded-lg px-3 py-1.5 text-xs font-semibold text-amber-500 hover:bg-white/5"
          >
            Change
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-10 lg:flex-row">
          <div className="flex-1">
            <StepProgress currentStep={2} />

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.15em] text-amber-500">
              Step 3 of 5
            </p>
            <h1 className="mt-1 font-serif text-3xl italic text-white">
              Tell us about the event.
            </h1>
            <p className="mt-2 max-w-lg text-sm text-gray-500">
              We use these details to prepare the perfect setup for your venue
              and occasion.
            </p>

            <div className="mt-6 space-y-5 rounded-2xl border border-white/8 bg-[#201f1c] p-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="event-date">Event Date *</Label>
                  <PickerTile
                    icon={<CalendarDays className="size-4" />}
                    display={formatDateDisplay(state.eventDate)}
                    placeholder="Select a date"
                    hasError={attempted && !!errors.eventDate}
                  >
                    <input
                      id="event-date"
                      type="date"
                      value={state.eventDate}
                      min={today}
                      onChange={(e) =>
                        updateEventDetails({ eventDate: e.target.value })
                      }
                      onClick={(e) => e.currentTarget.showPicker?.()}
                      className="absolute inset-0 h-full w-full cursor-pointer opacity-0 [color-scheme:dark]"
                    />
                  </PickerTile>
                  <FieldError
                    show={attempted && !!errors.eventDate}
                    message={errors.eventDate}
                  />
                </div>

                <div>
                  <Label htmlFor="start-time">Start Time *</Label>
                  <PickerTile
                    icon={<Clock className="size-4" />}
                    display={formatTimeDisplay(state.startTime)}
                    placeholder="Select a time"
                    hasError={attempted && !!errors.startTime}
                  >
                    <input
                      id="start-time"
                      type="time"
                      value={state.startTime}
                      onChange={(e) =>
                        updateEventDetails({ startTime: e.target.value })
                      }
                      onClick={(e) => e.currentTarget.showPicker?.()}
                      className="absolute inset-0 h-full w-full cursor-pointer opacity-0 [color-scheme:dark]"
                    />
                  </PickerTile>
                  <FieldError
                    show={attempted && !!errors.startTime}
                    message={errors.startTime}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="event-type">Event Type *</Label>
                <select
                  id="event-type"
                  value={state.eventType}
                  onChange={(e) =>
                    updateEventDetails({ eventType: e.target.value })
                  }
                  className={cn(
                    "w-full rounded-xl border bg-[#2a2926] px-4 py-3 text-white transition-colors focus:outline-none focus:ring-2",
                    attempted && !state.eventType
                      ? "border-red-500/50 focus:ring-red-500/30"
                      : "border-white/10 focus:border-amber-500/50 focus:ring-amber-500/50",
                  )}
                >
                  {EVENT_TYPES.map((t) => (
                    <option
                      key={t.value}
                      value={t.value}
                      className="bg-[#1b1b18]"
                    >
                      {t.label}
                    </option>
                  ))}
                </select>
                <FieldError
                  show={attempted && !!errors.eventType}
                  message={errors.eventType}
                />
              </div>

              <div>
                <Label htmlFor="venue">Venue / Address *</Label>
                <Input
                  id="venue"
                  type="text"
                  placeholder="e.g. The Grand Ballroom, Makati City"
                  value={state.venue}
                  onChange={(e) =>
                    updateEventDetails({ venue: e.target.value })
                  }
                  className={inputError("venue")}
                />
                <FieldError
                  show={attempted && !!errors.venue}
                  message={errors.venue}
                />
              </div>
              <div>
                <Label htmlFor="special-requests">
                  Special Requests{" "}
                  <span className="font-normal text-gray-600">(optional)</span>
                </Label>
                <Textarea
                  id="special-requests"
                  placeholder="Any specific themes, props, or requests for your event..."
                  rows={3}
                  value={state.specialRequests}
                  onChange={(e) =>
                    updateEventDetails({ specialRequests: e.target.value })
                  }
                />
              </div>
            </div>

            {attempted && !isValid && (
              <p className="-mt-2 mt-2 text-sm text-red-400">
                Please fill in all required fields above before continuing.
              </p>
            )}

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => navigate("/booking/package/package_1")}
                className="flex-1 rounded-full border border-white/20 py-4 text-base font-semibold text-white transition-colors hover:bg-white/5"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="flex-1 rounded-full bg-amber-500 py-4 text-base font-bold text-black transition-all hover:bg-amber-400 hover:shadow-[0_0_28px_rgba(245,158,11,0.35)]"
              >
                Continue to Contact Details
              </button>
            </div>
          </div>

          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
