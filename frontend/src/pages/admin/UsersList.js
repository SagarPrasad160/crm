import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import AuthContext from "../../context/AuthContext";

function UsersList() {
  const [users, setUsers] = useState([]);
  const { user, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && isAdmin) {
      navigate("/");
    }
    async function fetchUsers() {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/users");
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
  }, [user, isAdmin, navigate]);

  const usersList = users.map((user) => {
    return (
      <div key={user.id}>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Address: {user.address}</p>
        <p>Status: {user.status}</p>
        <p>
          <Link to={`/users/services/add/${user.id}`}>Add Service</Link>
        </p>
        <Link to={`/services/${user.id}`}>View Services</Link>
        <hr />
      </div>
    );
  });

  return (
    <div className="users-list border">
      <h1>Users</h1>
      <div>{usersList}</div>
      <Link to="/users/add">New User</Link>
    </div>
  );
}

export default UsersList;
