import Reporting from "./pages/Report";
import LoginPage from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./Layout";
import UserDetails from "./pages/UserDetails";
import MaterialDetails from "./mainTopics/inventory/MaterialDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/user"
          element={
            <Layout>
              <UserDetails />
            </Layout>
          }
        />
        <Route
          path="/report"
          element={
            <Layout>
              <Reporting />
            </Layout>
          }
        />
        <Route
          path="/material-details/:matCd"
          element={
            <Layout>
              <MaterialDetails />
            </Layout>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
}
export default App;
