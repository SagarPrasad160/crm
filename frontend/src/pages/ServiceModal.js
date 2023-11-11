import { useState, useContext } from "react";

import ServicesContext from "../context/ServicesContext";

function ServiceModal({ setShowModal, user }) {
  const [service, setService] = useState({
    type: "",
    charge: "",
    desc: "",
  });
  const { type, charge, desc } = service;

  const { addService } = useContext(ServicesContext);

  const handleChange = (e) => {
    setService({
      ...service,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addService(service);
    setShowModal(false);
  };
  return (
    <div className="modal-wrapper">
      <button
        className="btn btn-danger hide-modal"
        onClick={() => setShowModal(false)}
      >
        <i class="fa-solid fa-xmark"></i>
      </button>
      <div className="w-50">
        <h1 className="text-white">Service for {user.name}</h1>
        <form onSubmit={handleSubmit} className="mx-auto">
          <div className="mb-2">
            <label className="form-label text-white">Select a Service</label>
            <select
              className="form-control"
              value={type}
              name="type"
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
              value={charge || ""}
              onChange={handleChange}
              className="form-control"
              placeholder="Price"
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
            className="btn btn-primary text-white w-100 rounded-3 mt-2"
            type="submit"
          >
            <i class="fa-solid fa-plus"></i> Add Service
          </button>
        </form>
      </div>
    </div>
  );
}

export default ServiceModal;
