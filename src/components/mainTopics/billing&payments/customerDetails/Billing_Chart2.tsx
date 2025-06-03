import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Popup from "../../../shared/Popup";
import CustomButton from "../../../shared/Button";
import { BsBoxArrowUpRight } from "react-icons/bs";
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

const BillingChart2 = ({ data }: Props) => {
  const filteredData = data?.filter((item) => item.transDrCr === "Cr");
  const [showPopup, setShowPopup] = useState(false);
  return (
    data &&
    filteredData.length > 0 && (
      <div className="flex flex-col w-full bg-white m-2 rounded-md shadow-md pb-2">
        <div className="w-full h-72 ">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={filteredData}
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
              <Area
                type="monotone"
                dataKey="transAmt"
                stroke="#00bfae"
                fill="#b7efc5"
                fillOpacity={0.4}
              />
            </AreaChart>
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

export default BillingChart2;
