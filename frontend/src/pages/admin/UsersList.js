import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import AuthContext from "../../context/AuthContext";
import AddUser from "./AddUser";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { user, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  async function fetchUsers() {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users");
      setUsers(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (user && isAdmin) {
      navigate("/");
    }

    fetchUsers();

    // Apply styles to hide scroll when showModal is true
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }

    // Cleanup: Reset the style when the component unmounts or showModal changes
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [user, isAdmin, navigate, showModal]);

  const usersList = users.map((user) => {
    return (
      <div key={user.id}>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Address: {user.address}</p>
        <p>
          <Link to={`/users/services/add/${user.id}`}>Disable User</Link>
        </p>
        <Link to={`/services/${user.id}`}>View Services</Link>
        <hr />
      </div>
    );
  });

  return (
    <div className="users-list border">
      <h1>Users</h1>
      <button
        className="btn btn-primary text-white"
        onClick={() => setShowModal(true)}
      >
        Add User
      </button>
      <div>{usersList}</div>
      {showModal && (
        <AddUser fetchUsers={fetchUsers} setShowModal={setShowModal} />
      )}
    </div>
  );
}

export default UsersList;
