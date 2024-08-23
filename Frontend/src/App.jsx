import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Home from "./pages/Home";
import ProtectedRoute from "./ProtectedRoute.jsx";
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;
import { UserContextProvider } from "./UserContext.jsx";

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
