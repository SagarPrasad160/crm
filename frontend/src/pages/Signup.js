import { useState, useContext, useEffect } from "react";

import AuthContext from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

import { GiArchiveRegister } from "react-icons/gi";
import { CiLogin } from "react-icons/ci";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
  });

  const navigate = useNavigate();

  const { name, email, password, confirmPassword, address } = formData;

  const { registerUser, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        navigate("/");
      }, 0);
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !email || !address || !password || !confirmPassword) {
      alert("All fields are required!");
      return;
    }
    if (password !== confirmPassword) {
      alert("Both Passwords must match");
      return;
    }
    try {
      await registerUser(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sign-in text-white">
      <form
        className="mt-4 auth-form w-50 mx-auto rounded-3 shadow-lg p-3"
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            placeholder="email"
            name="email"
            className="form-control"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            placeholder="password"
            name="password"
            className="form-control"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            placeholder="confirm password"
            name="confirmPassword"
            className="form-control"
            value={confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <textarea
            className="form-control"
            value={address}
            onChange={address}
          ></textarea>
        </div>
        <div className="d-flex flex-wrap justify-content-center">
          <button
            className="btn btn-primary m-1 text-white my-auto"
            type="submit"
          >
            <GiArchiveRegister className="fs-4" /> Create Account
          </button>
          <Link className="btn btn-secondary" to="/signin">
            <CiLogin className="fs-4" /> Signin instead
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
