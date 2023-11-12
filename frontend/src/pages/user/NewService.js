import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import ServicesContext from "../../context/ServicesContext";

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
    navigate("/");
  };

  return (
    <div className="m-5 p-5 border rounded-3">
      <h1>Create a New Service</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="form-label text-white">Select a Service</label>
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
          <label className="text-white">Charges in $ </label>
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
          className="btn btn-primary text-white rounded-3 mt-2"
          type="submit"
        >
          <i class="fa-solid fa-plus"></i> Add Service
        </button>
      </form>
    </div>
  );
}

export default NewService;