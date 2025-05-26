import Reporting from "./pages/Reporting";
import LoginPage from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UserDetailsPageLayout from "./layouts/UserDetailsPageLayout";
//import Billing_payment_layout from "./layouts/Layout";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./layouts/Layout";
import BillingPage from "./pages/Billing_payment";
import UserLayout from "./Layout";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<LoginPage />} /> */}
        {/* <Route path="/report" element={<Reporting />} /> */}
        {/* <Route path="/user" element={<UserDetailsPageLayout />} /> */}
        <Route
          path="/report"
          element={
            <UserLayout>
              <Reporting />
            </UserLayout>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
}
export default App;
