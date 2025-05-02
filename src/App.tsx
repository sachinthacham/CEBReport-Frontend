import Reporting from "./pages/Reporting";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginLayout from "./components/LoginLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Reporting />} />
      <Route path="/login" element={<LoginLayout />} />
      <Route path="/landing" element={<LandingPage />} />
    </Routes>
  );
}
export default App;
