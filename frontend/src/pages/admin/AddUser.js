import { useState } from "react";

import { GiArchiveRegister } from "react-icons/gi";

import axios from "axios";

function AddUser(props) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
  });

  const { fetchUsers, setShowModal } = props;

  const { name, email, phone, address, password, confirmPassword } = userData;

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const registerUserAdmin = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.post(
        "http://localhost:5000/api/auth/create",
        formData,
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUserAdmin(userData);
      await fetchUsers();

      setUserData({
        name: "",
        email: "",
        password: "",
        phone: "",
        confirmPassword: "",
        address: "",
      });
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container text-white mt-5">
      <div className="row">
        <div className="col">
          <form className="mt-5 bg-dark p-4 rounded-3" onSubmit={handleSubmit}>
            <h1>Create new User</h1>
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
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="text"
                placeholder="Phone"
                name="phone"
                id="phone"
                className="form-control"
                value={phone}
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
                <GiArchiveRegister className="fs-4" /> Create User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
