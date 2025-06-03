import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import CustomButton from "../../../shared/Button";
import Popup from "../../../shared/Popup";
import { useState } from "react";
import { BsBoxArrowUpRight } from "react-icons/bs";

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
  return (
    data && (
      <div className="flex flex-col w-full bg-white m-2 rounded-md shadow-md pb-2">
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              barCategoryGap="10%"
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#333" }} />
              <YAxis
                tick={{ fontSize: 12, fill: "#333" }}
                domain={[0, "dataMax + 50"]}
                allowDataOverflow
              />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="units"
                fill="#118ab2"
                radius={[4, 4, 0, 0]}
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* View Report Button */}
        <div className="flex justify-center items-center">
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
          <Popup
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
