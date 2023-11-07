import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

function UserServices() {
  const params = useParams();
  const { userId } = params;
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await axios.get("http://localhost:5000/services/" + userId);
        setServices(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchServices();
  }, [userId]);

  const servicesList = services.map((service) => {
    return (
      <div key={service.id}>
        <p>{service.type}</p>
        <p>{service.charge}</p>
      </div>
    );
  });
  return (
    <div>
      <h1>Services for UserId: {userId}</h1>
      <div>{servicesList}</div>
    </div>
  );
}

export default UserServices;
