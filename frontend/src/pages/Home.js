import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import ServicesContext from "../context/ServicesContext";

import Spinner from "../components/Spinner";

function Home() {
  const [service, setService] = useState({
    type: "",
    charge: "",
  });
  const { type, charge } = service;
  const { isAuthenticated, user, logoutUser } = useContext(AuthContext);
  const { addService, getServices, services } = useContext(ServicesContext);
  const navigate = useNavigate();

  const handleClick = () => {
    logoutUser();
  };

  const handleChange = (e) => {
    setService({
      ...service,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addService(service);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
    getServices();
    //eslint-disable-next-line
  }, [isAuthenticated]);

  if (user) {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Welcome to Home Page</h1>
        <h2>Hi, {user.name}</h2>
        <button onClick={handleClick}>Logout</button>
        <form style={{ marginTop: "20px" }} onSubmit={handleSubmit}>
          <div>
            <label>Select a Service: </label>
            <select value={type} name="type" onChange={handleChange}>
              <option value="">-- Select a Service Type --</option>
              <option>Web Design</option>
              <option>SEO</option>
              <option>Cyber Security</option>
              <option>Graphic Design</option>
            </select>
          </div>
          <div>
            <label>Charges in $: </label>
            <input
              type="number"
              name="charge"
              value={charge || ""}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Add Service</button>
        </form>
        <div>
          {services.servicesData.length > 0 &&
            services.servicesData.map((service) => {
              return (
                <div key={service.id}>
                  <h2>{service.type}</h2>
                  <h3>${service.charge}</h3>
                  <hr />
                </div>
              );
            })}
        </div>
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default Home;
