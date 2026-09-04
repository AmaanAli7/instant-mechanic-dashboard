import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Analytics from "./pages/Analytics";
import Mechanics from "./pages/Mechanics";
import Customers from "./pages/Customers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route
          path="/bookings"
          element={<Bookings />}
        />

        <Route
          path="/mechanics"
          element={<Mechanics />}
        />

        <Route
          path="/customers"
          element={<Customers />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
