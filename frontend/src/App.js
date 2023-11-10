import { BrowserRouter, Routes, Route } from "react-router-dom";

import UsersList from "./pages/UsersList";
import UserServices from "./pages/UserServices";
import AddUser from "./pages/AddUser";
import AddService from "./pages/AddService";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

import { AuthProvider } from "./context/AuthContext";
import { ServicesProvider } from "./context/ServicesContext";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ServicesProvider>
          <div>
            <Routes>
              <Route path="/users" element={<UsersList />} />
              <Route path="/users/add" element={<AddUser />} />
              <Route
                path="/users/services/add/:userId"
                element={<AddService />}
              />
              <Route path="/services/:userId" element={<UserServices />} />
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </ServicesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
