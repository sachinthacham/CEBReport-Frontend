import { useEffect, useState } from "react";
import { fetchCustomerCountByProvince } from "../../services/BackendServices";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

type Province = {
  provinceName: string;
  count: number;
};

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28CFE",
  "#FF6F61",
  "#6DD400",
  "#D7263D",
  "#2E86AB",
  "#F4A261",
  "#E76F51",
];

const PieChartComponent = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);

  useEffect(() => {
    const fetchProvinceCustomerCount = async () => {
      const provinces = await fetchCustomerCountByProvince();
      setProvinces(provinces);
    };
    fetchProvinceCustomerCount();
  }, []);

  return (
    <div className="w-3/4 h-80 p-4 shadow-md flex items-center gap-10">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={provinces}
            dataKey="count"
            nameKey="provinceName"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label
          >
            {provinces.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      {/* Custom legend */}
      <div className="w-full">
        <ul className="text-sm space-y-1 grid grid-cols-2">
          {provinces.map((p, index) => (
            <li key={index} className="flex items-center gap-2">
              <span
                className="w-3 h-3 inline-block"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></span>
              {p.provinceName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PieChartComponent;
