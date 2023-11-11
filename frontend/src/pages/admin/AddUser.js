import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function AddUser() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    address: "",
    status: "",
  });

  const navigate = useNavigate();

  const { name, email, address, status } = userData;

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        name,
        email,
        address,
        status,
      });
      navigate("/users");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Create A New User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="user name"
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
          <select name="status" value={status} onChange={handleChange}>
            <option value="">-- Select Status --</option>
            <option>All Clear</option>
            <option>Pending</option>
            <option>Warning</option>
          </select>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default AddUser;
