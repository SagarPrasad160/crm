import { useState, useContext, useEffect } from "react";

import AuthContext from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

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
    <div>
      <h1>User Signup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="name"
            placeholder="name"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div>
          <textarea
            placeholder="address"
            name="address"
            value={address}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="confirm password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Sign Up</button>
        <Link to="/signin">Sign In</Link>
      </form>
    </div>
  );
}

export default Signup;
