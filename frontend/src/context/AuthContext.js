import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import setAuthToken from "../utils/setAuthToken";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    loading: true,
    isAuthenticated: false,
    token: localStorage.getItem("token") || null,
    user: null,
    errors: [],
  });
  const [isAdmin, setIsAdmin] = useState(false);

  const registerSuccess = (payload) => {
    localStorage.setItem("token", payload.token);
    setAuth({
      ...auth,
      ...payload,
      isAuthenticated: true,
      loading: false,
    });
  };

  const setIfAdmin = () => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode(token);
      setIsAdmin(decoded.user.isAdmin || false); // Set isAdmin from the decoded token
    } else {
      setIsAdmin(false);
    }
  };

  const registerFail = (payload) => {
    localStorage.removeItem("token");
    setAuth({
      ...auth,
      token: null,
      loading: false,
      isAuthenticated: false,
      user: null,
      errors: payload,
    });
  };

  const clearErrors = () => {
    setAuth({
      ...auth,
      error: null,
    });
  };

  const loadUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth");
      setAuth({
        ...auth,
        isAuthenticated: true,
        loading: false,
        user: res.data[0],
      });
    } catch (error) {
      registerFail(error.response.data.msg);
    }
  };

  const registerUser = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/create",
        formData,
        config
      );
      registerSuccess(res.data);
      if (auth.token) {
        loadUser();
      }
    } catch (error) {
      console.log(error);
      registerFail(error.response.data);
    }
  };

  const loginUser = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth",
        formData,
        config
      );
      registerSuccess(res.data);
      if (auth.token) {
        loadUser();
      }
    } catch (error) {
      console.log(error);
      // check for errors array
      if (Array.isArray(error.response.data.errors)) {
        registerFail(error.response.data.errors);
        return;
      }
      registerFail([{ msg: error.response.data.msg }]);
    }
  };

  const logoutUser = () => {
    registerFail();
  };

  useEffect(() => {
    setAuthToken(auth.token);
    if (auth.token) {
      loadUser();
      setIfAdmin();
    }
    // eslint-disable-next-line
  }, [auth.token]);

  return (
    <AuthContext.Provider
      value={{
        loading: auth.loading,
        isAuthenticated: auth.isAuthenticated,
        user: auth.user,
        isAdmin,
        errors: auth.errors,
        registerSuccess,
        registerUser,
        loginUser,
        logoutUser,
        clearErrors,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
