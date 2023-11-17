import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import AuthContext from "../../context/AuthContext";

function UsersList() {
  const [users, setUsers] = useState([]);

  const { user, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  async function fetchUsers() {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users");
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (user && !isAdmin) {
      navigate("/");
    }

    fetchUsers();
  }, [user, isAdmin, navigate]);

  const usersList = users.map((user) => {
    return (
      <li
        className="list-group-item border-0 bg-dark mb-3 shadow"
        key={user.id}
      >
        <div className="card bg-dark border-0 text-white">
          <div className="card-body">
            <h5 className="card-title">{user.name}</h5>
            <h6 className="card-subtitle mb-2 text-body-white">{user.email}</h6>
            <p className="card-text">{user.address}</p>
            <Link
              to={`/admin/users/${user.id}`}
              className="card-link btn btn-primary text-white"
            >
              View
            </Link>
            <Link
              to={`/services/${user.id}`}
              className="card-link btn btn-danger text-white"
            >
              Disable User
            </Link>
          </div>
        </div>
      </li>
    );
  });

  return (
    <div className="users-list mt-5 container text-white">
      <div className="row">
        <div className="col-md-3">
          <Link
            className="btn btn-primary text-white mt-5"
            to="/admin/users/add"
          >
            Add User
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col col-md-6">
          <ul className="list-group mt-5">{usersList}</ul>
        </div>
      </div>
    </div>
  );
}

export default UsersList;
