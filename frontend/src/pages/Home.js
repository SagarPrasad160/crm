import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import Spinner from "../components/Spinner";

function Home() {
  const { isAuthenticated, user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  if (!isAuthenticated) {
    navigate("/signin");
  }

  const handleClick = () => {
    logoutUser();
  };

  if (user) {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Welcome to Home Page</h1>
        <h2>Hi, {user.name}</h2>
        <button onClick={handleClick}>Logout</button>
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default Home;
