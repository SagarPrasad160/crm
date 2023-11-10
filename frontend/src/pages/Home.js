import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import ServicesContext from "../context/ServicesContext";

import Spinner from "../components/Spinner";
import Navbar from "../components/Navbar";
import Cards from "../components/Cards";

function Home() {
  const [service, setService] = useState({
    type: "",
    charge: "",
    desc: "",
  });
  const { type, charge, desc } = service;
  const { isAuthenticated, user } = useContext(AuthContext);
  const { addService, getServices, services } = useContext(ServicesContext);
  const navigate = useNavigate();

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
        <Navbar />
        <Cards />

        <form
          style={{ marginTop: "20px", textAlign: "center" }}
          onSubmit={handleSubmit}
          className="w-25 mx-auto"
        >
          <div className="mb-2">
            <label>Select a Service: </label>
            <select
              className="form-control"
              value={type}
              name="type"
              onChange={handleChange}
            >
              <option value="">-- Select a Service Type --</option>
              <option>Web Design</option>
              <option>SEO</option>
              <option>Cyber Security</option>
              <option>Graphic Design</option>
            </select>
          </div>
          <div className="mb-2">
            <label>Charges in $: </label>
            <input
              type="number"
              name="charge"
              value={charge || ""}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <label>Desciption</label>
            <textarea
              className="form-control"
              placeholder="description..."
              name="desc"
              value={desc}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-secondary" type="submit">
            + Add Service
          </button>
        </form>
        <div className="mt-5 w-50 mx-auto">
          {services.servicesData.length > 0 &&
            services.servicesData.map((service) => {
              return (
                <ul className="list-group" key={service.id}>
                  <div className="list-group-item">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">{service.type}</h5>
                      <span className="bg-success text-white rounded-circle p-1">
                        ${service.charge}
                      </span>
                    </div>
                    <p className="mb-1">{service.desc}</p>
                  </div>
                </ul>
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
