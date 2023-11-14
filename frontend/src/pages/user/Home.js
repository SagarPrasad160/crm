import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import ServicesContext from "../../context/ServicesContext";

import Spinner from "../../components/Spinner";
import Cards from "../../components/Cards";
import BarChart from "../../components/BarChart";

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
      <div className="home container">
        <Cards />
        <div className="row p-4 row-cols-1 row-cols-md-2">
          <div className="col bg-dark rounded-3 text-white my-auto shadow">
            <BarChart />
          </div>
          <div className="col mt-3">
            {services.servicesData.length > 0 && (
              <ul className="list-group">
                {services.servicesData.map((service) => (
                  <li
                    className="list-group-item border-0 bg-dark text-white mb-3 shadow"
                    key={service.id}
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">{service.type}</h5>
                      <span className="bg-primary rounded-circle p-1">
                        ${service.charge}
                      </span>
                    </div>
                    <p className="mb-1">{service.desc}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default Home;
