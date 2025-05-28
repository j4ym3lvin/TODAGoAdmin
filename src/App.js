import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import DriversPage from "./pages/DriversPage";
import PassengersPage from "./pages/PassengersPage";
import ReportsPage from "./pages/ReportsPage";
import TripsPage from "./pages/TripsPage";
import ConfigPage from "./pages/ConfigPage";
// ...other imports

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/drivers" element={<DriversPage />} />
        <Route path="/passengers" element={<PassengersPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/trips" element={<TripsPage />} />
        <Route path="/config" element={<ConfigPage />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
