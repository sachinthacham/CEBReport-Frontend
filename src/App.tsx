import Reporting from "./pages/Reporting";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/LoginPage";
import UserDetailsPageLayout from "./layouts/UserDetailsPageLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/report" element={<Reporting />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/user" element={<UserDetailsPageLayout />} />
      </Routes>
      <ToastContainer />
    </>
  );
}
export default App;
