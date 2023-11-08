import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

const ServicesContext = createContext();

export function ServicesProvider({ children }) {
  const [services, setServices] = useState({
    servicesData: [],
    error: null,
  });

  const [edit, setEdit] = useState({ isEdit: false, current: null });

  const { user } = useContext(AuthContext);

  const addService = async (service) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.post(
        `http://localhost:5000/api/users/${user.id}/services`,
        { ...service, user: user.id },
        config
      );
      getServices();
    } catch (error) {
      console.log(error);
      setServices({
        ...services,
        error,
      });
    }
  };

  const getServices = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/users/${user.id}/services`
      );
      setServices({
        ...services,
        servicesData: [...res.data],
      });
    } catch (error) {
      setServices({
        ...services,
        error,
      });
    }
  };

  const deleteService = async (id) => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      setServices({
        ...services,
        contactData: services.userServices.filter(
          (contact) => contact._id !== id
        ),
      });
    } catch (error) {
      setServices({
        ...services,
        error,
      });
    }
  };

  useEffect(() => {
    getServices();
    //eslint-disable-next-line
  }, [user]);

  return (
    <ServicesContext.Provider
      value={{
        services,
        addService,
        getServices,
        deleteService,
        setEdit,
        edit,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
}

export default ServicesContext;
