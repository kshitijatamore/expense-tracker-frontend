import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Auth />}
        />

        <Route
  path="/dashboard"
  element={
    localStorage.getItem("token")
      ? <Dashboard />
      : <Navigate to="/" />
  }
/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
