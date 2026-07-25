import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import ListingDetail from "./pages/ListingDetail.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import HostDashboard from "./pages/HostDashboard.jsx";
import CreateListing from "./pages/CreateListing.jsx";
import EditListing from "./pages/EditListing.jsx";
import MyTrips from "./pages/MyTrips.jsx";

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
    </div>
  );
}
