import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

const ServicesContext = createContext();

export function ServicesProvider({ children }) {
  const [services, setServices] = useState({
    servicesData: [],
    error: null,
  });

  const fetchUserServices = useCallback(async (userId) => {
    try {
      const servicesRes = await axios.get(
        "http://localhost:5000/api/users/" + userId + "/services"
      );
      return servicesRes.data;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const [edit, setEdit] = useState({ isEdit: false, current: null });

  const { user } = useContext(AuthContext);

  const getUserService = async (userId, serviceId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/users/${userId}/services/${serviceId}`
      );
      return res.data[0];
    } catch (error) {
      console.log(error);
    }
  };

  const addUserService = async (service, isRequest) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      if (isRequest) {
        await axios.post(
          `http://localhost:5000/api/users/request/${user.id}/services`,
          { ...service },
          config
        );
        getUserServices();
      } else {
        await axios.post(
          `http://localhost:5000/api/users/assign/${user.id}/services`,
          { ...service },
          config
        );
      }
    } catch (error) {
      console.log(error);
      setServices({
        ...services,
        error,
      });
    }
  };

  const updateUserService = async (service, serviceId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.post(
        `http://localhost:5000/api/users/${user.id}/services/update/${serviceId}`,
        { ...service },
        config
      );
    } catch (error) {
      console.log(error);
      setServices({
        ...services,
        error,
      });
    }
  };

  const getUserServices = async () => {
    try {
      if (user) {
        const res = await axios.get(
          `http://localhost:5000/api/users/${user.id}/services`
        );
        setServices({
          ...services,
          servicesData: [...res.data],
        });
      }
    } catch (error) {
      setServices({
        ...services,
        error,
      });
    }
  };

  const deleteUserService = async (id) => {
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
    getUserServices();
    //eslint-disable-next-line
  }, [user]);

  return (
    <ServicesContext.Provider
      value={{
        services,
        addUserService,
        fetchUserServices,
        getUserService,
        getUserServices,
        updateUserService,
        deleteUserService,
        setEdit,
        edit,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
}

export default ServicesContext;
