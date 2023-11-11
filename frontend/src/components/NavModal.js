import { Link } from "react-router-dom";

import { AiFillHome } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { MdWork } from "react-icons/md";
import { BiSolidLogOutCircle } from "react-icons/bi";

export default function NavModal({ setShowNavModal }) {
  return (
    <div className="navmodal">
      <button
        className="btn btn-danger hide-modal"
        onClick={() => setShowNavModal(false)}
      >
        <FaX />
      </button>
      <ul className="list-group w-50">
        <li className="list-group-item">
          <Link
            className="d-flex text-decoration-none align-items-center"
            to="/"
            onClick={() => setShowNavModal(false)}
          >
            <AiFillHome className="fs-5" />
            <p className="my-auto fw-bolder">Dashboard</p>
          </Link>
        </li>
        <li className="list-group-item">
          <Link
            className="d-flex text-decoration-none align-items-center"
            to="/create-new"
            onClick={() => setShowNavModal(false)}
          >
            <MdWork className="fs-5" />
            <p className="my-auto fw-bolder">Create a new Service</p>
          </Link>
        </li>
        <li className="list-group-item">
          <Link
            className="d-flex  text-decoration-none"
            to="/signin"
            onClick={() => setShowNavModal(false)}
          >
            <BiSolidLogOutCircle className="fs-5" />
            <p className="my-auto fw-bolder">Logout</p>
          </Link>
        </li>
        <li className="list-group-item">
          <Link
            className="d-flex text-decoration-none align-items-center"
            to="/profile"
            onClick={() => setShowNavModal(false)}
          >
            <FaUserCircle className="fs-5" />
            <p className="my-auto fw-bolder">Profile</p>
          </Link>
        </li>
      </ul>
    </div>
  );
}
