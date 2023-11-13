import { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
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

  const { loginUser, isAuthenticated, errors, clearErrors } =
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
    if (!email || !password) {
      alert("Please provide email and password both!");
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
        className="mt-4 auth-form mx-auto bg-dark rounded-3 shadow-lg p-3 col-md-6 col-lg-6"
        onSubmit={handleSubmit}
      >
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
        {errors?.length > 0 &&
          errors.map((error, idx) => (
            <p key={idx} className="text-danger text-center">
              {error.msg}
            </p>
          ))}
        <div className="d-flex flex-wrap justify-content-center">
          <button
            className="btn btn-primary m-1 text-white my-auto"
            type="submit"
          >
            <CiLogin className="fs-4" /> Sign In
          </button>
          <Link className="btn btn-secondary m-1" to="/signup">
            <GiArchiveRegister className="fs-4" /> Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signin;
