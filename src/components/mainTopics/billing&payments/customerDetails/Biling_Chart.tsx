import CustomButton from "../../../shared/Button";
import Popup1 from "../../../shared/Popup1";
import { useState } from "react";
import { BsBoxArrowUpRight } from "react-icons/bs";
import BarChartComponent from "./BarChart";
import AreaChartComponent from "./AreaChart";

type ReadDetails = {
  billCycle: string;
  days: string;
  kwh: string;
  readDate: string;
  readMet1: string;
  readMet2: string;
  readMet3: string;
  units: string;
  year: string;
};

type Props = {
  data: ReadDetails[];
};

const BillingChart = ({ data }: Props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [chartType, setChartType] = useState<"bar" | "area">("bar");

  return (
    data && (
      <div className="flex flex-col w-full bg-white m-2 rounded-md shadow-md pb-4">
        {/* Dropdown */}
        <div className="flex justify-end p-2">
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value as "bar" | "area")}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="bar">Bar Chart</option>
            <option value="area">Area Chart</option>
          </select>
        </div>

        {/* Chart */}
        <div className="w-full h-72">
          {chartType === "bar" ? (
            <BarChartComponent data={data} />
          ) : (
            <AreaChartComponent data={data} />
          )}
        </div>

        {/* View Report Button */}
        <div className="flex justify-center items-center mt-2">
          <CustomButton
            color="bg-[#005f73] hover:bg-green-700"
            icon={<BsBoxArrowUpRight className="h-5 w-5" />}
            width="w-1/2"
            height="h-8"
            onClick={() => setShowPopup(true)}
          >
            View Report
          </CustomButton>
        </div>

        {showPopup && (
          <Popup1
            title="Report Preview"
            message="Here’s your report preview or message..."
            onClose={() => setShowPopup(false)}
          />
        )}
      </div>
    )
  );
};

export default BillingChart;
