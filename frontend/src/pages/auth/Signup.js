import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import AuthContext from "../../context/AuthContext";

import { GiArchiveRegister } from "react-icons/gi";
import { CiLogin } from "react-icons/ci";

import { toast } from "react-toastify";

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

  const { registerUser, isAuthenticated, clearErrors } =
    useContext(AuthContext);

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
    clearErrors();
    if (!name || !email || !address || !password || !confirmPassword) {
      alert("All fields are required!");
      return;
    }
    if (password !== confirmPassword) {
      alert("Both passwords must match");
      return;
    }
    try {
      await registerUser(formData);
      toast.success("Account Created Successfully!");
    } catch (error) {
      toast.warning("Something went wrong!");
      console.log(error);
    }
  };

  return (
    <div className="sign-in text-white">
      <form
        className="mt-4 auth-form mx-auto bg-dark rounded-3 shadow-lg p-3 col-md-6 col-lg-6"
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Name
          </label>
          <input
            type="text"
            placeholder="Name"
            name="name"
            id="name"
            className="form-control"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            className="form-control"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            className="form-control"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <textarea
            className="form-control"
            value={address}
            name="address"
            onChange={handleChange}
            id="address"
          ></textarea>
        </div>
        <div className="d-flex flex-wrap justify-content-center">
          <button
            className="btn btn-primary m-1 text-white my-auto"
            type="submit"
          >
            <GiArchiveRegister className="fs-4" /> Create Account
          </button>
          <Link className="btn btn-secondary m-1" to="/signin">
            <CiLogin className="fs-4" /> Sign In instead
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
