import Reporting from "./pages/Reporting";
import LoginPage from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./Layout";
import UserDetails from "./pages/UserDetails";

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
      </Routes>
      <ToastContainer />
    </>
  );
}
export default App;
