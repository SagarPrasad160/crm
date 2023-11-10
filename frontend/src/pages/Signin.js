import { useState, useContext, useEffect } from "react";

import AuthContext from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

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
    <div>
      <h1>User Signin</h1>
      <form onSubmit={handleSubmit}>
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
          <input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Sign In</button>
        <Link to="/signup">Sign Up</Link>
      </form>
    </div>
  );
}

export default Signin;
