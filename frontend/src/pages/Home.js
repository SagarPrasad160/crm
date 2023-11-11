import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import ServicesContext from "../context/ServicesContext";

import Spinner from "../components/Spinner";
import Cards from "../components/Cards";

function Home() {
  const { isAuthenticated, user } = useContext(AuthContext);
  const { getServices, services } = useContext(ServicesContext);
  const navigate = useNavigate();

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
        <Cards />
        <div className="mt-5 w-50 mx-auto">
          {services.servicesData.length > 0 &&
            services.servicesData.map((service) => {
              return (
                <ul className="list-group" key={service.id}>
                  <div className="list-group-item">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">{service.type}</h5>
                      <span className="bg-primary text-white rounded-circle p-1">
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
