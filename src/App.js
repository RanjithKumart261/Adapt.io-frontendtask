import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AuthRoute from "./components/AuthRoute";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AuthProvider>
          <Routes>
            <Route path="/" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/register" element={
              <AuthRoute>
                <Register />
              </AuthRoute>
            } />
            <Route path="/login" element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            } />
          </Routes>
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
