import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import { CiLogout } from "react-icons/ci";
import { RiBillFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";

import ServiceModal from "../pages/user/ServiceModal";
import NavModal from "./NavModal";

function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const [showNavModal, setShowNavModal] = useState(false);
  const { user, isAdmin, logoutUser } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (showModal || showNavModal) {
      document.body.style.overflowY = "hidden";
      document.querySelector(".modal-wrapper")?.classList.add("show-animation");
      document.querySelector(".navmodal")?.classList.add("show-animation");
    } else {
      document.body.style.overflowY = "scroll";
      document
        .querySelector(".modal-wrapper")
        ?.classList.remove("show-animation");
      document.querySelector(".navmodal")?.classList.remove("show-animation");
    }

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, [showModal, showNavModal]);

  const handleLogout = () => {
    logoutUser();
    navigate("/signin");
  };

  return (
    <div>
      {showModal && <ServiceModal user={user} setShowModal={setShowModal} />}
      {showNavModal && <NavModal setShowNavModal={setShowNavModal} />}
      <nav className="navbar navbar-expand-lg bg-dark text-white p-2 d-flex justify-content-between">
        {user && (
          <div className="p-2 d-flex align-items-center">
            <Link to="/" className="navbar-brand text-white">
              <i className="fa-solid fa-house"></i>
              {isAdmin ? "" : "Dashboard"}
            </Link>
            {isAdmin ? (
              <h3>Admin Panel</h3>
            ) : (
              <div className="d-lg-flex d-none pt-1">
                <button
                  className="btn btn-primary create-new text-white mb-1"
                  onClick={() => setShowModal(true)}
                >
                  <i className="fa-solid fa-plus"></i> Create new Service
                </button>
              </div>
            )}
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
          <div className="d-lg-flex d-none w-md-50 justify-content-between p-4 nav-left">
            <input
              className="form-control d-inline w-50"
              placeholder="Enter Service.."
              type="text"
            />
            <button className="btn btn-primary text-white mx-4">Search</button>

            <div className="dropdown">
              <p
                className="my-auto navbar-brand text-white dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {user.name} <i className="fa-solid fa-user"></i>
              </p>
              <ul className="dropdown-menu p-1">
                <li className="mb-1">
                  <Link
                    className="btn btn-secondary text-white w-100"
                    to="/profile"
                  >
                    <FaUserCircle className="fs-4" /> Profile
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    className="btn btn-secondary text-white w-100"
                    to="/billing"
                  >
                    <RiBillFill className="fs-4" /> Billing
                  </Link>
                </li>
                <li>
                  <button
                    className="btn btn-danger w-100"
                    onClick={handleLogout}
                  >
                    <CiLogout className="fs-4" /> Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
