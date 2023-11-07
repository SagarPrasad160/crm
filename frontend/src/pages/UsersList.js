import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get("http://localhost:5000/users");
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
  }, []);

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
    <div>
      <h1>Users</h1>
      <div>{usersList}</div>
      <Link to="/users/add">New User</Link>
    </div>
  );
}

export default UsersList;
