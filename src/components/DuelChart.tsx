import { useState } from "react";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";

const DuelChart = () => {
  const [selectedOption, setSelectedOption] = useState<string>("pie");

  const handleSetChart = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };
  return (
    <div className="w-full">
      <select value={selectedOption} onChange={handleSetChart}>
        <option value="bar">Bar chart</option>
        <option value="pie">Pie chart</option>
      </select>
      {selectedOption === "bar" ? <BarChart /> : <PieChart />}
    </div>
  );
};

export default DuelChart;
