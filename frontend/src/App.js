import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import NewService from "./pages/user/NewService";
import Home from "./pages/user/Home";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import Profile from "./pages/user/Profile";
import Billing from "./pages/user/Billing";

import UsersList from "./pages/admin/UsersList";
import AddUser from "./pages/admin/AddUser";
import UserProfile from "./pages/admin/UserProfile";
import AssignService from "./pages/admin/AssignService";
import ViewService from "./pages/admin/ViewService";

import { AuthProvider } from "./context/AuthContext";
import { ServicesProvider } from "./context/ServicesContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ServicesProvider>
          <div className="overlay">
            <div className="App">
              <Navbar />
              <Routes>
                <Route path="/create-new" element={<NewService />} />
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/billing" element={<Billing />} />
                <Route path="/admin/users" element={<UsersList />} />
                <Route path="/admin/users/add" element={<AddUser />} />
                <Route path="/admin/users/:userId" element={<UserProfile />} />
                <Route
                  path="/admin/users/:userId/assign-service"
                  element={<AssignService />}
                />
                <Route
                  path="/admin/users/:userId/services/:serviceId"
                  element={<ViewService />}
                />
              </Routes>
              <ToastContainer />
            </div>
          </div>
        </ServicesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
