import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";

import Spinner from "../../components/Spinner";

import { BsFacebook, BsGoogle, BsInstagram, BsLinkedin } from "react-icons/bs";

function Profile() {
  const { user, isAuthenticated, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!isAuthenticated && !loading) {
    navigate("/sigin");
  } else if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className="container mt-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-7">
            <div className="card profile p-3 py-4">
              <div className="text-center">
                <img
                  src="https://i.imgur.com/bDLhJiP.jpg"
                  width="100"
                  className="rounded-circle"
                  alt="user pic"
                />
              </div>

              <div className="text-center mt-3">
                <span className="bg-secondary p-1 px-4 rounded text-white">
                  Pro
                </span>
                <h5 className="mt-2 mb-0">{user.name}</h5>
                <span>{user.email}</span>

                <div className="px-4 mt-1">
                  <p className="fonts">{user.address}. </p>
                </div>

                <ul className="social-list">
                  <li>
                    <BsFacebook className="fs-4" />
                  </li>
                  <li>
                    <BsInstagram className="fs-4" />
                  </li>
                  <li>
                    <BsLinkedin className="fs-4" />
                  </li>
                  <li>
                    <BsGoogle className="fs-4" />
                  </li>
                </ul>

                <div className="buttons">
                  <button className="btn btn-outline-primary px-4">
                    Message
                  </button>
                  <button className="btn btn-primary px-4 ms-3">Contact</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
