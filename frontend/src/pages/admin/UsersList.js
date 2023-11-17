import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { FaPlus } from "react-icons/fa";

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

  const usersTable = (
    <div className="table-responsive">
      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <th scope="row">{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>
                <Link
                  to={`/admin/users/${user.id}`}
                  className="btn btn-primary text-white me-2"
                >
                  View
                </Link>
                <Link
                  to={`/services/${user.id}`}
                  className="btn btn-danger text-white"
                >
                  Disable User
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="users-list container p-5 text-white">
      <div className="row">
        <div className="col-md-3">
          <Link className="btn btn-primary text-white" to="/admin/users/add">
            <FaPlus className="text-white mb-1" /> <span>Add User</span>
          </Link>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col bg-dark rounded-2">
          {users.length > 0 ? (
            usersTable
          ) : (
            <p>No users available. Add a user to the list.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UsersList;
