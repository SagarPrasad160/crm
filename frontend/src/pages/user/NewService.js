import { useState, useContext, useEffect, useCallback } from "react";

import { useNavigate } from "react-router-dom";

import ServicesContext from "../../context/ServicesContext";

import { toast } from "react-toastify";

import axios from "axios";

function NewService() {
  const [service, setService] = useState({
    type: "",
    desc: "",
  });
  const [serviceLabels, setServiceLabels] = useState([]);
  const { type, desc } = service;
  const { addUserService } = useContext(ServicesContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setService({
      ...service,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addUserService(service, true);
      toast.success("Service added successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchServicesData = useCallback(() => {
    return async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/admin/services/data"
        );
        setServiceLabels(res.data);
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  useEffect(() => {
    fetchServicesData();
  }, [fetchServicesData]);

  return (
    <div className="m-5">
      <form
        className="p-5 bg-dark rounded-3 text-white"
        onSubmit={handleSubmit}
      >
        <h1>Create a New Service</h1>
        <div className="mb-2">
          <label className="form-label">Select a Service</label>
          <select
            className="form-control"
            name="type"
            value={type}
            onChange={handleChange}
          >
            <option value="">-- Select a Service Type --</option>
            {serviceLabels.map((service) => (
              <option>
                {service.type} ${service.charge}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="form-label">Desciption</label>
          <textarea
            className="form-control"
            placeholder="Service description..."
            name="desc"
            value={desc}
            onChange={handleChange}
          />
        </div>
        <button
          className="btn btn-primary text-white rounded-3 mt-2"
          type="submit"
        >
          <i className="fa-solid fa-plus"></i> Add Service
        </button>
      </form>
    </div>
  );
}

export default NewService;
