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

type Props = {
  data: any[];
};

const BarChartComponent = ({ data }: Props) => {
  return (
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
          name="Units"
          fill="#118ab2"
          radius={[4, 4, 0, 0]}
          barSize={40}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
