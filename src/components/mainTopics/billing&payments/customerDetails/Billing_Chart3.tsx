import {
  AreaChart,
  Area,
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
import { BsBoxArrowUpRight } from "react-icons/bs";
import Popup from "../../../shared/Popup1";
import { useState } from "react";

type Props = {
  data: customerTransDetail[];
};

export type customerTransDetail = {
  billCycle: string;
  yrMnth: string;
  days: string;
  units: string;
  metRead1: null | string;
  metRead2: null | string;
  metRead3: null | string;
  transDate: string;
  transAmt: number;
  transDrCr: string;
  transCode: null | string;
  transType: string;
  prvBalance: number;
  balance: number;
  balDrCr: string;
};

const BillingChart3 = ({ data }: Props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [chartType, setChartType] = useState<"bar" | "area">("bar");

  const renderChart = () => {
    if (chartType === "area") {
      return (
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="yrMnth" tick={{ fontSize: 12, fill: "#333" }} />
          <YAxis
            domain={[0, "dataMax + 50"]}
            tick={{ fontSize: 12, fill: "#333" }}
          />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#ffa600"
            fill="#ffe5b4"
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
          <XAxis dataKey="yrMnth" tick={{ fontSize: 12, fill: "#333" }} />
          <YAxis
            domain={[0, "dataMax + 50"]}
            tick={{ fontSize: 12, fill: "#333" }}
            allowDataOverflow
          />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="balance"
            fill="#ffa600"
            stroke="#ffa600"
            radius={[4, 4, 0, 0]}
          />
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
            onChange={(e) => setChartType(e.target.value as "bar" | "area")}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm"
          >
            <option value="bar">Bar Chart</option>
            <option value="area">Area Chart</option>
          </select>
        </div>

        {/* Chart Display */}
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>

        {/* Popup */}
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

export default BillingChart3;
