import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import ServiceModal from "../pages/ServiceModal";
import NavModal from "./NavModal";

function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const [showNavModal, setShowNavModal] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, [showModal]);

  return (
    <div>
      {showModal && <ServiceModal user={user} setShowModal={setShowModal} />}
      {showNavModal && <NavModal setShowNavModal={setShowNavModal} />}
      <nav className="navbar navbar-expand-lg bg-body-dark d-flex justify-content-between">
        {user && (
          <div className="p-2 d-flex align-items-center">
            <Link to="/" className="navbar-brand text-white pt-2">
              <i className="fa-solid fa-house"></i> Dashboard
            </Link>
            <div className="d-lg-flex d-none">
              <button
                className="btn btn-primary create-new text-white mb-1"
                onClick={() => setShowModal(true)}
              >
                <i className="fa-solid fa-plus"></i> Create new Service
              </button>
            </div>
            <i
              className="fa-solid fa-bars fs-4 d-flex d-lg-none"
              onClick={() => setShowNavModal(true)}
            ></i>
          </div>
        )}
        {!user && (
          <h1 className="mx-auto">
            Welcome to Cortana, Your Personalized CRM System
          </h1>
        )}
        {user && (
          <div className="d-lg-flex d-none w-50 p-2 nav-left">
            <p className="my-auto mr-3 navbar-brand text-white">
              Hi,{user.name} <i className="fa-solid fa-user"></i>
            </p>
            <input
              className="form-control w-50"
              placeholder="Enter Service.."
              type="text"
            />
            <button className="btn btn-primary text-white mx-4">Search</button>
            <button className="btn btn-danger" onClick={logoutUser}>
              Logout
            </button>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
