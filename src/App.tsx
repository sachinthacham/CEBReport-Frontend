import Reporting from "./pages/Reporting";
import LoginPage from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UserDetailsPageLayout from "./layouts/UserDetailsPageLayout";
import Billing_payment_layout from "./layouts/Billing_payment_layout";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/report" element={<Reporting />} />
        <Route path="/user" element={<UserDetailsPageLayout />} />
        <Route path="/billing" element={<Billing_payment_layout />} />
      </Routes>
      <ToastContainer />
    </>
  );
}
export default App;
