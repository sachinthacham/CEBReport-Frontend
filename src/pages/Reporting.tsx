import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import UserNavBar from "../components/layout/UserNavBar";

const Reporting = () => {
  return (
    <div className="min-h-screen">
      <UserNavBar />
      <Navbar />
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/5">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Reporting;
