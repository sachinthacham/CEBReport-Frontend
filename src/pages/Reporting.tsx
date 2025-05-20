import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import UserNavBar from "../components/layout/UserNavBar";
import AreaBarChart from "../components/reporting/AreaBarChart";
import DuelChart from "../components/reporting/DuelChart";
import ButtonList from "../components/shared/ButtonList";

const Reporting = () => {
  const [selectedProvinceId, setSelectedProvinceId] = useState<number>(1);

  return (
    <div className="min-h-screen">
      <UserNavBar />
      <Navbar />
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/5">
          <Sidebar />
        </div>

        <div className="w-4/5 p-4">
          <div className="flex gap-5 w-full">
            {/* Bar Chart based on selected province */}
            <AreaBarChart selectedProvinceId={selectedProvinceId} />
            {/* Province Buttons */}
            <ButtonList setSelectedProvinceId={setSelectedProvinceId} />
          </div>
          <div>
            <DuelChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reporting;
