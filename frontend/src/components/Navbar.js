import { useContext } from "react";

import AuthContext from "../context/AuthContext";

function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary d-flex justify-content-between">
        <div className="p-2">
          <span className="navbar-brand">Navbar</span>
          <button className="btn btn-success mb-1">+ Create new Service</button>
        </div>
        <div className="d-flex w-50 p-2">
          <p className="my-auto mr-3 navbar-brand">Hi,{user && user.name}</p>
          <input
            className="form-control w-50"
            placeholder="Enter Service.."
            type="text"
          />
          <button className="btn btn-primary mx-4">Search</button>
          <button className="btn btn-danger" onClick={logoutUser}>
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
