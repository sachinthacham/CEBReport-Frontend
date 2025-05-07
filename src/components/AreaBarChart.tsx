import { useEffect, useState } from "react";
import BarChartComponent from "./BarChart";
import { fetchCustomerCountByArea } from "../services/BackendServices";

type Area = {
  areaName: string;
  count: number;
};

const AreaBarChart = ({
  selectedProvinceId,
}: {
  selectedProvinceId: number;
}) => {
  const [areas, setAreas] = useState<{ name: string; count: number }[]>([]);

  useEffect(() => {
    const fetchAreaCount = async () => {
      const provincesData: Area[] = await fetchCustomerCountByArea(
        selectedProvinceId
      );
      const formatted = provincesData.map((item) => ({
        name: item.areaName,
        count: item.count,
      }));
      setAreas(formatted);
    };
    fetchAreaCount();
  }, [selectedProvinceId]);
  return <BarChartComponent data={areas} />;
};

export default AreaBarChart;
