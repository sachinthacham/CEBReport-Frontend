import BarChartComponent from "../components/BarChart";
import Navbar from "../components/Navbar";
import PieChartComponent from "../components/PieChart";
import RightSideBar from "../components/RightSideBar";
import Sidebar from "../components/Sidebar";
import UserNavBar from "../components/UserNavBar";

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

        {/* Main Content */}
        <div className="flex-1 p-4">
          <h2 className="text-xl font-bold mb-4">Distribution 1</h2>
          <div className="flex gap-8">
            <PieChartComponent />
            <BarChartComponent />
          </div>
        </div>
        {/* right side bar */}
        <div className="w-1/6">
          <RightSideBar />
        </div>
      </div>
    </div>
  );
};

export default Reporting;
