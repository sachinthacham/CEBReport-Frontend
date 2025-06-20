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
            name="Balance"
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
            name="Balance"
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
      <div className="w-full h-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden flex flex-col relative group">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Professional Header */}
        <div className="bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 px-4 py-3 flex-shrink-0 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">
                  Payment Trends
                </h3>
                <p className="text-orange-100 text-xs">Balance analysis</p>
              </div>
            </div>

            {/* Chart Type Selector */}
            <div className="flex items-center gap-1">
              <span className="text-orange-100 text-xs font-medium">Type:</span>
              <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value as "bar" | "area")}
                className="px-2 py-1 text-xs bg-white/20 border border-white/30 rounded text-white focus:ring-1 focus:ring-white/50 focus:border-white outline-none transition-all duration-200 backdrop-blur-sm"
              >
                <option value="bar" className="text-gray-800">
                  Bar
                </option>
                <option value="area" className="text-gray-800">
                  Area
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Chart Container */}
        <div className="flex-1 p-3 min-h-0">
          <div className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              {renderChart()}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Data Insights Bar - After Chart */}
        <div className="bg-gradient-to-r from-gray-50 to-orange-50 px-4 py-2 border-t border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="text-gray-600">Total:</span>
                <span className="font-semibold text-orange-600">
                  Rs.{" "}
                  {data
                    .reduce((sum, item) => sum + (item.balance || 0), 0)
                    .toFixed(2)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-600">Avg:</span>
                <span className="font-semibold text-blue-600">
                  Rs.{" "}
                  {(
                    data.reduce((sum, item) => sum + (item.balance || 0), 0) /
                      data.length || 0
                  ).toFixed(2)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-600">Max:</span>
                <span className="font-semibold text-purple-600">
                  Rs.{" "}
                  {Math.max(...data.map((item) => item.balance || 0)).toFixed(
                    2
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="bg-gradient-to-r from-gray-50 to-orange-50 px-4 py-2 border-t border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <span className="text-gray-600 text-xs">
                {data.length} records
              </span>
            </div>
            <button
              onClick={() => setShowPopup(true)}
              className="px-4 py-1.5 bg-gradient-to-r from-orange-600 to-orange-700 text-white text-xs font-medium rounded hover:from-orange-700 hover:to-orange-800 focus:ring-1 focus:ring-orange-500/20 focus:outline-none transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm hover:shadow flex items-center gap-1 group"
            >
              <svg
                className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              View Report
            </button>
          </div>
        </div>

        {/* Enhanced Popup */}
        {showPopup && (
          <Popup
            title="Payment Trends Report"
            message="Detailed analysis of customer payment trends and balance patterns"
            onClose={() => setShowPopup(false)}
          />
        )}
      </div>
    )
  );
};

export default BillingChart3;
