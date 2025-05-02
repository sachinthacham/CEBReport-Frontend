import { useEffect, useState } from "react";
import { fetchProvinceData } from "../services/BackendServices";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Province = {
  id: number;
  provinceName: string;
  divisionId: number;
  division: {
    id: number;
    divisionName: string;
  };
};

const pieData = [
  { name: "Frontend", value: 400 },
  { name: "Backend", value: 300 },
  { name: "DevOps", value: 300 },
  { name: "Design", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PieChartComponent = () => {
  const [provinces, setProvinces] = useState();

  useEffect(() => {
    const fetchProvinces = async () => {
      const provinces = await fetchProvinceData();
      setProvinces(provinces);
    };
    fetchProvinces();
  }, []);

  return (
    <div className="w-full h-80 p-4 shadow-md">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
