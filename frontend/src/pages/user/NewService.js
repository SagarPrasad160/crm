import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import ServicesContext from "../../context/ServicesContext";

import { toast } from "react-toastify";

function NewService() {
  const [service, setService] = useState({
    type: "",
    charge: "",
    desc: "",
  });
  const { type, charge, desc } = service;
  const { addService } = useContext(ServicesContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setService({
      ...service,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addService(service);
    toast.success("Service added successfully!");
    navigate("/");
  };

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
            <option>Web Design</option>
            <option>SEO</option>
            <option>Cyber Security</option>
            <option>Graphic Design</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="form-label">Charges in $ </label>
          <input
            type="number"
            name="charge"
            className="form-control"
            placeholder="Price"
            value={charge}
            onChange={handleChange}
          />
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
