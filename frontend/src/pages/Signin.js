import { useState, useContext, useEffect } from "react";

import AuthContext from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

import { CiLogin } from "react-icons/ci";
import { GiArchiveRegister } from "react-icons/gi";

function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { email, password } = formData;

  const { loginUser, isAuthenticated } = useContext(AuthContext);

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
    if (!email || !password) {
      alert("please provide email and password both!");
      return;
    }
    try {
      await loginUser(formData);
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
        <div className="d-flex flex-wrap justify-content-center">
          <button
            className="btn btn-primary m-1 text-white my-auto"
            type="submit"
          >
            <CiLogin className="fs-4" /> Sign In
          </button>
          <Link className="btn btn-secondary" to="/signup">
            <GiArchiveRegister className="fs-4" /> Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signin;
