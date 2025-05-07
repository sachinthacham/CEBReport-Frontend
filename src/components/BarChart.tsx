// import { useEffect, useState } from "react";
// import { fetchCustomerCountByProvince } from "../services/BackendServices";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// type Province = {
//   provinceName: string;
//   count: number;
// };

// const BarChartComponent = () => {
//   const [provinces, setProvinces] = useState<Province[]>([]);

//   useEffect(() => {
//     const fetchProvinceCount = async () => {
//       const provincesData = await fetchCustomerCountByProvince();
//       setProvinces(provincesData);
//     };
//     fetchProvinceCount();
//   }, []);
//   return (
//     <div className="w-full h-80 shadow-md">
//       <ResponsiveContainer width="100%" height="100%">
//         <BarChart data={provinces}>
//           <XAxis
//             dataKey="provinceName"
//             angle={-20}
//             textAnchor="end"
//             interval={0}
//             tick={{ fontSize: 12 }}
//           />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="count" fill="#79d226" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default BarChartComponent;

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: DataItem[];
};
type DataItem = {
  name: string;
  count: number;
};

const BarChartComponent = ({ data }: Props) => {
  return (
    <div className="w-full h-80 shadow-md col-span-7 bg-white p-5 rounded-md">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            angle={-20}
            textAnchor="end"
            interval={0}
            tick={{ fontSize: 12 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#25a18e" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
