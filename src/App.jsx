import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import Listings from "./Listings";
import Login from "./Login";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Register from "./Register";
import NewListings from "./NewListings";
function App() {
  return (
    <div>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Listings />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="create-listing" element={<NewListings />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
