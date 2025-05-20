import { useEffect, useState } from "react";
import { fetchCustomerCountByProvince } from "../../services/BackendServices";

import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
  Legend,
} from "recharts";
type Province = {
  provinceName: string;
  count: number;
};

const HorizontalBarChartComponent = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);

  useEffect(() => {
    const fetchProvinceCustomerCount = async () => {
      const provinces = await fetchCustomerCountByProvince();
      setProvinces(provinces);
    };
    fetchProvinceCustomerCount();
  }, []);
  return (
    <div className="w-full h-80 shadow-md">
      <AreaChart
        width={900}
        height={300}
        data={provinces}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="provinceName"
          angle={-20}
          textAnchor="end"
          interval={0}
          tick={{ fontSize: 12 }}
        />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="count"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </div>
  );
};

export default HorizontalBarChartComponent;
