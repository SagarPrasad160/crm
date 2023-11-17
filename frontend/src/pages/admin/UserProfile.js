import { useEffect, useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import ServicesContext from "../../context/ServicesContext";

import Spinner from "../../components/Spinner";

import { BsFacebook, BsInstagram, BsLinkedin, BsGoogle } from "react-icons/bs";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [userServices, setUserServices] = useState([]);
  const { getUser } = useContext(AuthContext);

  const { fetchUserServices } = useContext(ServicesContext);

  const { userId } = useParams();

  const loadUser = async (userId) => {
    const userData = await getUser(userId);
    setUser(userData);
    const userServices = await fetchUserServices(userId);
    setUserServices(userServices);
  };

  useEffect(() => {
    loadUser(userId);
    //eslint-disable-next-line
  }, []);

  if (!user) {
    return <Spinner />;
  } else {
    return (
      <div className="container mt-5">
        <div className="row  d-flex justify-content-center">
          <div className="col-md-7">
            <div className="card profile bg-dark text-white p-3 py-4">
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
                  <Link
                    to={`/admin/users/${user.id}/assign-service`}
                    className="btn btn-outline-primary px-4 text"
                  >
                    Assign New Service
                  </Link>
                  <button className="btn px-4 ms-3">Disable</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7 mx-auto mt-5">
            <ul className="list-group">
              {userServices.length > 0 ? (
                userServices.map((service) => (
                  <li
                    className="list-group-item border-0 bg-dark text-white mb-3 shadow"
                    key={service.id}
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">{service.type}</h5>
                      <span className="bg-primary rounded-2 p-2">
                        {service.status}{" "}
                      </span>
                      {service.status === "Pending" && (
                        <Link
                          to={`/admin/users/${userId}/services/${service.id}`}
                          className="btn btn-secondary text-white"
                        >
                          View Service
                        </Link>
                      )}
                    </div>
                    <p className="mb-1">{service.desc}</p>
                  </li>
                ))
              ) : (
                <h3 className="text-white text-center">
                  No Services for this user yet.
                </h3>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
