import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import ServicesContext from "../../context/ServicesContext";
import Spinner from "../../components/Spinner";

import axios from "axios";

function ViewService() {
  const [user, setUser] = useState(null);
  const [userService, setUserService] = useState(null);
  const [serviceLabels, setServiceLabels] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    charge: "",
    paymentCycle: "",
    desc: "",
  });

  const { name, type, charge, paymentCycle, desc } = formData;

  const { getUser } = useContext(AuthContext);
  const { updateUserService, getUserService } = useContext(ServicesContext);
  const { userId, serviceId } = useParams();
  const navigate = useNavigate();

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
    const fetchData = async () => {
      if (userId) {
        const userData = await getUser(userId);
        loadUser(userId);
        fetchServicesData();

        // Fetch user service data
        const serviceData = await getUserService(userId, serviceId);
        setUserService(serviceData);

        // Update formData after fetching user service data
        setFormData({
          name: userData?.name || "",
          type: serviceData?.type || "",
          charge: "",
          paymentCycle: "",
          desc: serviceData?.desc || "",
        });
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, serviceId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userId && serviceId) {
      try {
        updateUserService(
          { ...formData, user: userId, status: "Completed" },
          serviceId
        );
        setFormData({
          name: "",
          type: "",
          charge: "",
          paymentCycle: "",
          desc: "",
        });
        navigate(`/admin/users/${userId}/services`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (!user) {
    return <Spinner />;
  } else {
    return (
      <div className="container mt-5">
        <form
          className="mt-5 bg-dark rounded-3 p-4 text-white"
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input
              className="form-control"
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Select a Service</label>
            <select
              className="form-select"
              name="type"
              value={type}
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
              name="charge"
              value={charge}
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
              name="desc"
              value={desc}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-primary text-white">
            Mark Service Complete
          </button>
        </form>
      </div>
    );
  }
}

export default ViewService;
