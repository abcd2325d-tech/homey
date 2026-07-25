import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import BottomNav from "./components/BottomNav.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import ListingDetail from "./pages/ListingDetail.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import HostDashboard from "./pages/HostDashboard.jsx";
import CreateListing from "./pages/CreateListing.jsx";
import EditListing from "./pages/EditListing.jsx";
import MyTrips from "./pages/MyTrips.jsx";
import Wishlists from "./pages/Wishlists.jsx";
import Messages from "./pages/Messages.jsx";
import MessageThread from "./pages/MessageThread.jsx";
import Profile from "./pages/Profile.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings/:id" element={<ListingDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/trips"
            element={
              <ProtectedRoute>
                <MyTrips />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlists"
            element={
              <ProtectedRoute>
                <Wishlists />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages/:bookingId"
            element={
              <ProtectedRoute>
                <MessageThread />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/host"
            element={
              <ProtectedRoute hostOnly>
                <HostDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/host/new"
            element={
              <ProtectedRoute hostOnly>
                <CreateListing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/host/edit/:id"
            element={
              <ProtectedRoute hostOnly>
                <EditListing />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<div className="page"><p>Page not found.</p></div>} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  );
}
