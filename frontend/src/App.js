import { BrowserRouter, Routes, Route } from "react-router-dom";

import UsersList from "./pages/UsersList";
import UserServices from "./pages/UserServices";
import AddUser from "./pages/AddUser";
import AddService from "./pages/AddService";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/services/add/:userId" element={<AddService />} />
          <Route path="/services/:userId" element={<UserServices />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
