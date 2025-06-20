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

type Props = {
  data: any[];
};

const AreaChartComponent = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
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
        <Area
          type="monotone"
          dataKey="units"
          name="Units"
          stroke="#118ab2"
          fill="#118ab2"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
