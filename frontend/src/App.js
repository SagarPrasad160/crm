import { BrowserRouter, Routes, Route } from "react-router-dom";

import NewService from "./pages/user/NewService";
import Home from "./pages/user/Home";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import Navbar from "./components/Navbar";
import Profile from "./pages/user/Profile";

import { AuthProvider } from "./context/AuthContext";
import { ServicesProvider } from "./context/ServicesContext";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ServicesProvider>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/create-new" element={<NewService />} />
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </ServicesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
