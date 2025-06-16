import Reporting from "./pages/Report";
import LoginPage from "./pages/LoginPage";
import { Routes, Route, Navigate } from "react-router-dom";
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
              <Navigate to="/report/general" replace />
            </Layout>
          }
        />
        <Route
          path="/report/general"
          element={
            <Layout>
              <Reporting />
            </Layout>
          }
        />
        <Route
          path="/report/billing-payment"
          element={
            <Layout>
              <Reporting />
            </Layout>
          }
        />
        <Route
          path="/report/analysis"
          element={
            <Layout>
              <Reporting />
            </Layout>
          }
        />
        <Route
          path="/report/collections"
          element={
            <Layout>
              <Reporting />
            </Layout>
          }
        />
        <Route
          path="/report/consumption-analysis"
          element={
            <Layout>
              <Reporting />
            </Layout>
          }
        />
        <Route
          path="/report/solar-information"
          element={
            <Layout>
              <Reporting />
            </Layout>
          }
        />
        <Route
          path="/report/pucsl-liss"
          element={
            <Layout>
              <Reporting />
            </Layout>
          }
        />
        <Route
          path="/report/inventory"
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
