import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Packages from "./pages/Packages";
import BookingPage from "./components/booking/BookingPage";
import PackageDetailPage from "./components/booking/PackageDetailPage";
import BoothSelectionPage from "./components/booking/BoothSelectionPage";
import { BookingProvider } from "./components/booking/BookingContext";
import EventDetailsPage from "./components/booking/EventDetailsPage";
import ContactDetailsPage from "./components/booking/ContactDetailsPage";
import ReviewPage from "./components/booking/ReviewPage";
import { ScrollToTop } from "./components/scroll-to-top";
import ConfirmationPage from "./components/booking/ConfirmationPage";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/packages" element={<Packages />} />
        <Route
          path="/booking/*"
          element={
            <BookingProvider>
              <Routes>
                <Route index element={<BookingPage />} />
                <Route
                  path="package/:packageId"
                  element={<PackageDetailPage />}
                />
                <Route path="event" element={<EventDetailsPage />} />
                <Route path="booth" element={<BoothSelectionPage />} />
                <Route path="details" element={<ContactDetailsPage />} />
                <Route path="review" element={<ReviewPage />} />
                <Route path="confirmation" element={<ConfirmationPage />} />
              </Routes>
            </BookingProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
