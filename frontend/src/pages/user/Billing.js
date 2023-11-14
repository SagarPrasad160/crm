import { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import ServicesContext from "../../context/ServicesContext";

function Billing() {
  const [data, setData] = useState([]);
  const { user, isAuthenticated } = useContext(AuthContext);
  const { services } = useContext(ServicesContext);

  const { servicesData } = services;

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
    const map = {};
    if (servicesData.length) {
      servicesData.forEach((service) => {
        if (map[service.type]) {
          map[service.type].total += service.charge;
          map[service.type].qty++;
        } else {
          map[service.type] = { qty: 1, total: service.charge };
        }
      });
      const mappedData = [];
      for (let key in map) {
        mappedData.push({
          type: key,
          total: map[key].total,
          qty: map[key].qty,
        });
      }
      setData(mappedData);
    }
  }, [isAuthenticated, user, navigate, servicesData]);

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col">
          <table className="table table-border table-responsive table-dark rounded-3 table-striped table-hover caption-top">
            <caption className="bg-dark text-white text-center fs-5 fw-bolder">
              Services Consumed
            </caption>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Service</th>
                <th scope="col">Price</th>
                <th scope="col">quantity</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.map((service, index) => {
                return (
                  <tr key={service.type}>
                    <th scope="row">{index + 1}</th>
                    <td>{service.type}</td>
                    <td>{service.total / service.qty}</td>
                    <td>{service.qty}</td>
                    <td>{service.total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 mb-3 mb-sm-0 d-none">
          <div className="card bg-dark text-white">
            <div className="card-body">
              <h5 className="card-title">Special title treatment</h5>
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <button className="btn btn-primary text-white">
                Go somewhere
              </button>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card bg-dark text-white">
            <div className="card-body">
              <h5 className="card-title">Special title treatment</h5>
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <button className="btn btn-primary text-white">
                Go somewhere
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Billing;
