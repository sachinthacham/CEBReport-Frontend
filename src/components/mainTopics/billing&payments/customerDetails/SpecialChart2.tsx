import {
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  BarChart,
} from "recharts";
import Popup2 from "../../../shared/Popup2";
import CustomButton from "../../../shared/Button";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { useState } from "react";

type Props = {
  data: customerTransDetail[];
};

export type customerTransDetail = {
  billCycle: string;
  year: string;
  transDate: string | null;
  transType: string;
  reading: string | null;
  units: string | null;
  rate: number;
  amount: number;
  monthlyChg: number;
  payments: number;
  debits: number;
  credits: number;
  dueAmount: number;
  dueAmtDrCr: null;
  balance: string | null;
  balanceDrCr: string | null;
};

const BillingChart2 = ({ data }: Props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [chartType, setChartType] = useState<"area" | "bar">("area");

  const renderChart = () => {
    if (chartType === "area") {
      return (
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#333" }} />
          <YAxis
            domain={[0, "dataMax + 50"]}
            tick={{ fontSize: 12, fill: "#333" }}
          />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#00bfae"
            fill="#b7efc5"
            fillOpacity={0.4}
          />
        </AreaChart>
      );
    } else {
      return (
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#333" }} />
          <YAxis
            domain={[0, "dataMax + 50"]}
            tick={{ fontSize: 12, fill: "#333" }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#00bfae" />
        </BarChart>
      );
    }
  };

  return (
    data &&
    data.length > 0 && (
      <div className="flex flex-col w-full bg-white m-2 rounded-md shadow-md pb-4">
        {/* Dropdown Selector */}
        <div className="flex justify-end items-center p-2">
          <select
            id="chart-select"
            value={chartType}
            onChange={(e) => setChartType(e.target.value as "area" | "bar")}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm"
          >
            <option value="area">Area Chart</option>
            <option value="bar">Bar Chart</option>
          </select>
        </div>

        {/* Chart Display */}
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>

        {/* Report Button */}
        {/* <div className="flex justify-center items-center mt-2">
          <CustomButton
            color="bg-[#005f73] hover:bg-green-700"
            icon={<BsBoxArrowUpRight className="h-5 w-5" />}
            width="w-1/2"
            height="h-8"
            onClick={() => setShowPopup(true)}
          >
            View Report
          </CustomButton>
        </div> */}

        {/* Popup */}
        {/* {showPopup && (
          <Popup2
            title="Report Preview"
            message="Here’s your report preview or message..."
            onClose={() => setShowPopup(false)}
          />
        )} */}
      </div>
    )
  );
};

export default BillingChart2;
