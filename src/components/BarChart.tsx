import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const barData = [
  { name: "HTML", uv: 400 },
  { name: "CSS", uv: 300 },
  { name: "JavaScript", uv: 500 },
  { name: "React", uv: 200 },
  { name: "CSS", uv: 700 },
  { name: "JavaScript", uv: 100 },
  { name: "React", uv: 400 },
];

const BarChartComponent = () => {
  return (
    <div className="w-full h-80 shadow-md">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={barData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="uv" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
