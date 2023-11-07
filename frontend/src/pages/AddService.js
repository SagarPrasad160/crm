import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

function AddService() {
  const [serviceType, setServiceType] = useState("");
  const [serviceCharge, setServiceCharge] = useState(0);

  const params = useParams();
  const navigate = useNavigate();
  const { userId } = params;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/services", {
        type: serviceType,
        charge: serviceCharge,
        user: userId,
      });
      navigate("/users");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Add a Service for userId: {userId}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Select a Service: </label>
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
          >
            <option value="">-- Select a Service Type --</option>
            <option>Web Design</option>
            <option>SEO</option>
            <option>Cyber Security</option>
            <option>Graphic Design</option>
          </select>
        </div>
        <div>
          <label>Charges in $: </label>
          <input
            type="number"
            value={serviceCharge || ""}
            onChange={(e) => setServiceCharge(e.target.value)}
          />
        </div>
        <button type="submit">Add Service</button>
      </form>
    </div>
  );
}

export default AddService;
