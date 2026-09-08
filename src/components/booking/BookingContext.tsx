// src/components/booking/BookingContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";
import { PACKAGES } from "./BookingPage";

type BoothType = "classic" | "premium";

type BookingState = {
  packageId: string | null;
  backdrop: string;
  duration: string;
  boothType: BoothType;
  eventDate: string;
  startTime: string;
  eventType: string;
  venue: string;
  guestCount: string;
  specialRequests: string;
  fullName: string;
  email: string;
  phone: string;
  confirmationRef: string | null;
  agreedToTerms: boolean;
};

type EventDetailsFields = {
  eventDate: string;
  startTime: string;
  eventType: string;
  venue: string;
  guestCount: string;
  specialRequests: string;
};

type ContactDetailsFields = {
  fullName: string;
  email: string;
  phone: string;
};

type BookingContextType = {
  state: BookingState;
  setPackage: (id: string, backdrop: string, duration: string) => void;
  setBoothType: (type: BoothType) => void;
  updateEventDetails: (fields: Partial<EventDetailsFields>) => void;
  updateContactDetails: (fields: Partial<ContactDetailsFields>) => void;
  setConfirmationRef: (ref: string) => void;
  setAgreedToTerms: (agreed: boolean) => void;
  resetBooking: () => void;
  total: number;
};

const BookingContext = createContext<BookingContextType | null>(null);

const BACKDROP_PRICES: Record<string, number> = {
  solid: 0,
  sequin: 500,
  floral: 800,
};
const DURATION_PRICES: Record<string, number> = {
  "2h": 0,
  "3h": 1500,
  "4h": 3000,
};
const PREMIUM_BOOTH_PRICE = 1000;

const INITIAL_STATE: BookingState = {
  packageId: null,
  backdrop: "solid",
  duration: "2h",
  boothType: "classic",
  eventDate: "",
  startTime: "",
  eventType: "",
  venue: "",
  guestCount: "",
  specialRequests: "",
  fullName: "",
  email: "",
  phone: "",
  confirmationRef: null,
  agreedToTerms: false,
};

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BookingState>(INITIAL_STATE);

  const setPackage = (id: string, backdrop: string, duration: string) =>
    setState((prev) => ({ ...prev, packageId: id, backdrop, duration }));

  const setBoothType = (type: BoothType) =>
    setState((prev) => ({ ...prev, boothType: type }));

  const updateEventDetails = (fields: Partial<EventDetailsFields>) =>
    setState((prev) => ({ ...prev, ...fields }));

  const updateContactDetails = (fields: Partial<ContactDetailsFields>) =>
    setState((prev) => ({ ...prev, ...fields }));

  const setConfirmationRef = (ref: string) =>
    setState((prev) => ({ ...prev, confirmationRef: ref }));

  const setAgreedToTerms = (agreed: boolean) =>
    setState((prev) => ({ ...prev, agreedToTerms: agreed }));

  const resetBooking = () => setState(INITIAL_STATE);

  const pkg = PACKAGES.find((p) => p.value === state.packageId);
  const total =
    (pkg?.price ?? 0) +
    (BACKDROP_PRICES[state.backdrop] ?? 0) +
    (DURATION_PRICES[state.duration] ?? 0) +
    (state.boothType === "premium" ? PREMIUM_BOOTH_PRICE : 0);

  return (
    <BookingContext.Provider
      value={{
        state,
        setPackage,
        setBoothType,
        updateEventDetails,
        updateContactDetails,
        setConfirmationRef,
        setAgreedToTerms,
        resetBooking,
        total,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within a BookingProvider");
  return ctx;
}
