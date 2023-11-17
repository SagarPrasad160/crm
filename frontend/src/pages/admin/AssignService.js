import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import ServicesContext from "../../context/ServicesContext";
import Spinner from "../../components/Spinner";

import axios from "axios";

function AssignService() {
  const [user, setUser] = useState(null);
  const [serviceLabels, setServiceLabels] = useState([]);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    type: "",
    charge: "",
    paymentCycle: "",
    desc: "",
  });

  const { name, type, charge, paymentCycle, desc } = formData;

  const { getUser } = useContext(AuthContext);
  const { addUserService } = useContext(ServicesContext);
  const { userId } = useParams();

  const loadUser = async (userId) => {
    const userData = await getUser(userId);
    setUser(userData);
    setFormData({ ...formData, name: userData?.name });
  };

  const fetchServicesData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/services/data"
      );
      setServiceLabels(res.data);
    } catch (error) {
      console.error("Error fetching service data:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      loadUser(userId);
      const fetchData = async () => {
        await fetchServicesData();
        // Update formData after fetching user data
      };

      fetchData();
    }

    //eslint-disable-next-line
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    addUserService({ ...formData, user: userId, status: "Completed" }, false);
    setFormData({
      name: user?.name || "",
      type: "",
      charge: "",
      paymentCycle: "",
      desc: "",
    });
  };

  if (!user) {
    return <Spinner />;
  } else {
    return (
      <div className="container mt-5 text-white">
        <form className="mt-5 bg-dark rounded-3 p-4" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input
              className="form-control"
              type="text"
              value={name}
              name="name"
              id="name"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Select a Service</label>
            <select
              className="form-select"
              value={type}
              name="type"
              onChange={handleChange}
            >
              <option value="">-- Select a Service Type --</option>
              {serviceLabels.map((service) => (
                <option key={service.type}>{service.type}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="charge">
              Charge
            </label>
            <input
              type="number"
              className="form-control"
              id="charge"
              value={charge}
              name="charge"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Payment Cycle</label>
            <select
              id="paymentCycle"
              name="paymentCycle"
              className="form-select"
              value={paymentCycle}
              onChange={handleChange}
            >
              <option value="">-- Select Monthly Payment Cycle --</option>
              <option value="3">3</option>
              <option value="6">6</option>
              <option value="12">12</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              value={desc}
              name="desc"
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-primary text-white">Assign</button>
        </form>
      </div>
    );
  }
}

export default AssignService;
