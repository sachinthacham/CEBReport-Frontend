import Reporting from "./pages/Reporting";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginLayout from "./components/LoginLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/report" element={<Reporting />} />
        <Route path="/" element={<LoginLayout />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
}
export default App;
