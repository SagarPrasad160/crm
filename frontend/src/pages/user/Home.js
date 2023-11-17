import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import ServicesContext from "../../context/ServicesContext";

import Spinner from "../../components/Spinner";
import Cards from "../../components/Cards";
import BarChart from "../../components/BarChart";

const cardsData = [
  {
    data: 3500,
    progress: "+15%",
    desc: "Total Users",
  },
  {
    data: 120,
    progress: "-5%",
    desc: "Active Users",
  },
  {
    data: 250,
    progress: "+20%",
    desc: "New Users",
  },
  {
    data: 500,
    progress: "+10%",
    desc: "Registered Users",
  },
  // Add more card objects as needed
];

function Home() {
  const { isAuthenticated, user, isAdmin } = useContext(AuthContext);
  const { getUserServices, services } = useContext(ServicesContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
    if (isAdmin) {
      navigate("/admin");
    }
    getUserServices();
    //eslint-disable-next-line
  }, [isAuthenticated, isAdmin]);

  if (user) {
    return (
      <div className="home container mt-5">
        <Cards cards={cardsData} />
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
                      <span className="bg-primary rounded-2 p-2">
                        {service.status}
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
