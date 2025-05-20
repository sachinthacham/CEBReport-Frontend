import { useState } from "react";
import HorizontalBarChartComponent from "../../components/reporting/HorizontalBarChart";
import PieChartComponent from "../../components/reporting/PieChart";

const DuelChart = () => {
  const [selectedOption, setSelectedOption] = useState<string>("area");

  const handleSetChart = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };
  return (
    <div className="w-full mx-5 pt-5">
      <select
        value={selectedOption}
        onChange={handleSetChart}
        className="w-1/4 bg-white text-gray-800 border border-gray-300 rounded-md h-10 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition-colors"
      >
        <option value="area">📈 Area Chart</option>
        <option value="pie">🥧 Pie Chart</option>
      </select>

      {selectedOption === "pie" ? (
        <PieChartComponent />
      ) : (
        <HorizontalBarChartComponent />
      )}
    </div>
  );
};

export default DuelChart;
