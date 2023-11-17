import { useState, useContext, useEffect, useCallback } from "react";

import ServicesContext from "../../context/ServicesContext";

import { toast } from "react-toastify";

import axios from "axios";

function ServiceModal({ setShowModal, user }) {
  const [service, setService] = useState({
    type: "",
    desc: "",
  });
  const [serviceLabels, setServiceLabels] = useState([]);
  const { type, desc } = service;

  const { addUserService } = useContext(ServicesContext);

  const handleChange = (e) => {
    setService({
      ...service,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUserService({ ...service, user: user?.id }, true);
    setShowModal(false);
    toast.success("Service Added Successfully!");
  };

  const fetchServicesData = useCallback(async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/services/data"
      );
      setServiceLabels(res.data);
    } catch (error) {
      console.error("Error fetching service data:", error);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchServicesData();
    };

    fetchData();
  }, [fetchServicesData]);

  return (
    <div className="modal-wrapper">
      <button
        className="btn btn-danger hide-modal"
        onClick={() => setShowModal(false)}
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
      <div className="w-50">
        <h1 className="text-white">Service for {user.name}</h1>
        <form onSubmit={handleSubmit} className="mx-auto">
          <div className="mb-2">
            <label className="form-label text-white">Select a Service</label>
            <select
              className="form-select form-select-lg"
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
          <div className="mb-2">
            <label className="form-label text-white">Desciption</label>
            <textarea
              className="form-control"
              placeholder="Service description..."
              name="desc"
              value={desc}
              onChange={handleChange}
            />
          </div>
          <button
            className="btn btn-primary text-white w-100 rounded-3 mt-2"
            type="submit"
          >
            Request Service
          </button>
        </form>
      </div>
    </div>
  );
}

export default ServiceModal;
