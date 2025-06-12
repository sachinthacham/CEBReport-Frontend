import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

type MaterialStock = {
  ErrorMessage: string | null;
  MatCd: string;
  QtyOnHand: number;
  Region: string;
  MatNm?: string;
};

type ProvinceStock = {
  ErrorMessage: string | null;
  MatCd: string;
  QtyOnHand: number;
  Province: string;
  MatNm?: string;
};

type StockBalance = {
  MatCd: string;
  Region: string;
  Province: string;
  DeptId: string;
  MatNm: string;
  UnitPrice: number;
  CommittedCost: number;
  ReorderQty: number;
  UomCd: string;
  ErrorMessage: string | null;
};

// Professional color schemes
const REGION_COLORS = ["#1E40AF", "#059669", "#DC2626", "#7C3AED", "#EA580C"];
const PROVINCE_COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EF4444", "#06B6D4", "#84CC16", "#F97316"];

const mapRegionName = (region: string): string => {
  const regionMap: { [key: string]: string } = {
    'DISCO1': 'DD1',
    'DISCO2': 'DD2',
    'DISCO3': 'DD3',
    'DISCO4': 'DD4'
  };
  return regionMap[region] || region;
};

const renderCustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg text-xs border border-gray-200">
        <div className="font-medium">MatCd: {data.MatCd}</div>
        <div>Region: {mapRegionName(data.Region)}</div>
        <div className="font-semibold text-blue-600">Qty On Hand: {data.QtyOnHand}</div>
      </div>
    );
  }
  return null;
};

const renderProvinceTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg text-xs border border-gray-200">
        <div className="font-medium">MatCd: {data.MatCd}</div>
        <div>Province: {data.Province}</div>
        <div className="font-semibold text-purple-600">Qty On Hand: {data.QtyOnHand}</div>
      </div>
    );
  }
  return null;
};

const MaterialDetails: React.FC = () => {
  const { matCd } = useParams<{ matCd: string }>();
  const [materials, setMaterials] = useState<MaterialStock[]>([]);
  const [provinceStocks, setProvinceStocks] = useState<ProvinceStock[]>([]);
  const [stockBalances, setStockBalances] = useState<StockBalance[]>([]);
  const [materialName, setMaterialName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [provinceLoading, setProvinceLoading] = useState(true);
  const [stockBalanceLoading, setStockBalanceLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [provinceError, setProvinceError] = useState<string | null>(null);
  const [stockBalanceError, setStockBalanceError] = useState<string | null>(null);
  const [chartType, setChartType] = useState<"donut" | "bar" | "pie">("donut");
  const [provinceChartType, setProvinceChartType] = useState<"donut" | "bar" | "pie">("donut");
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMaterial = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/materials/stocks/by-matcd/${matCd}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const materialData = data.data || [];
        setMaterials(materialData);
        if (materialData.length > 0) {
          setMaterialName(materialData[0].MatNm || null);
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch material details.");
      } finally {
        setLoading(false);
      }
    };

    if (matCd) {
      fetchMaterial();
    }
  }, [matCd]);

  useEffect(() => {
    const fetchProvinceStocks = async () => {
      setProvinceLoading(true);
      setProvinceError(null);
      try {
        const possibleUrls = [
          `https://localhost:44381/api/materials/stocks/by-matcd-province-wise/${matCd}`,
          `/api/materials/stocks/by-matcd-province-wise/${matCd}`,
          `http://localhost:44381/api/materials/stocks/by-matcd-province-wise/${matCd}`
        ];

        let response: Response | null = null;
        let lastError: string = "";

        for (const url of possibleUrls) {
          try {
            response = await fetch(url);
            if (response.ok) break;
          } catch (err: any) {
            lastError = err.message;
            continue;
          }
        }

        if (!response || !response.ok) {
          throw new Error(`All API endpoints failed. Last error: ${lastError || response?.status}`);
        }

        const data = await response.json();
        let provinceData: ProvinceStock[] = [];
        if (Array.isArray(data)) {
          provinceData = data;
        } else if (data.data && Array.isArray(data.data)) {
          provinceData = data.data;
        } else if (data.result && Array.isArray(data.result)) {
          provinceData = data.result;
        }

        setProvinceStocks(provinceData);
        
      } catch (err: any) {
        const errorMessage = err.message || "Failed to fetch province stocks";
        setProvinceError(errorMessage);
        setProvinceStocks([]);
      } finally {
        setProvinceLoading(false);
      }
    };

    if (matCd) {
      fetchProvinceStocks();
    }
  }, [matCd]);

  useEffect(() => {
    const fetchStockBalances = async () => {
      setStockBalanceLoading(true);
      setStockBalanceError(null);
      
      try {
        const possibleUrls = [
          `https://localhost:44381/api/materials/stock-balances?matCd=${matCd}`,
          `/api/materials/stock-balances?matCd=${matCd}`,
          `http://localhost:44381/api/materials/stock-balances?matCd=${matCd}`
        ];

        let response: Response | null = null;
        let lastError: string = "";

        for (const url of possibleUrls) {
          try {
            response = await fetch(url);
            if (response.ok) break;
          } catch (err: any) {
            lastError = err.message;
            continue;
          }
        }

        if (!response || !response.ok) {
          throw new Error(`All API endpoints failed. Last error: ${lastError || response?.status}`);
        }

        const data = await response.json();
        let stockBalanceData: StockBalance[] = [];
        if (Array.isArray(data)) {
          stockBalanceData = data;
        } else if (data.data && Array.isArray(data.data)) {
          stockBalanceData = data.data;
        } else if (data.result && Array.isArray(data.result)) {
          stockBalanceData = data.result;
        }

        setStockBalances(stockBalanceData);
        
      } catch (err: any) {
        const errorMessage = err.message || "Failed to fetch stock balances";
        setStockBalanceError(errorMessage);
        setStockBalances([]);
      } finally {
        setStockBalanceLoading(false);
      }
    };

    if (matCd) {
      fetchStockBalances();
    }
  }, [matCd]);

  const downloadAsCSV = () => {
    if (!stockBalances || stockBalances.length === 0) return;
    const csvRows = [
      ["Region", "Province", "Department", "Material Name", "Unit Price", "Committed Cost", "Reorder Qty", "UOM"],
      ...stockBalances.map((balance) => [
        mapRegionName(balance.Region),
        balance.Province,
        balance.DeptId,
        balance.MatNm,
        balance.UnitPrice.toString(),
        balance.CommittedCost.toString(),
        balance.ReorderQty.toString(),
        balance.UomCd,
      ]),
    ];
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `StockBalances_${matCd}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const printPDF = () => {
    if (!printRef.current) return;
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  if (loading) return <div className="flex justify-center items-center py-8 text-blue-600">Loading...</div>;
  if (error) return <div className="text-red-600 bg-red-50 border border-red-200 p-4 rounded">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded shadow font-sans">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-semibold text-gray-600">Material Details Dashboard</h2>
      </div>

      {/* Stock Balances Table */}
      <div className="mb-8" ref={printRef}>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium text-gray-700">Stock Balances Of - {matCd}</h3>
              <div className="flex gap-2">
                <button onClick={printPDF} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
                  Print PDF
                </button>
                <button onClick={downloadAsCSV} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                  Download Excel
                </button>
              </div>
            </div>
            {stockBalances.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex">
                  <div className="text-gray-500 font-semibold mr-2">Material Name:</div>
                  <div className="text-gray-700">{stockBalances[0].MatNm}</div>
                </div>
                <div className="flex">
                  <div className="text-gray-500 font-semibold mr-2">Unit Price:</div>
                  <div className="text-gray-700">
                    {stockBalances[0].UnitPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {stockBalanceLoading ? (
            <div className="flex justify-center items-center py-8 text-blue-600">Loading stock balances...</div>
          ) : stockBalanceError ? (
            <div className="text-red-600 bg-red-50 border border-red-200 p-4 rounded">
              <div className="text-sm text-red-600 mb-2">Error loading stock balances: {stockBalanceError}</div>
              <div className="text-xs text-gray-500">Check the browser console for more details.</div>
            </div>
          ) : stockBalances.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 rounded">
                <thead className="bg-purple-100">
                  <tr>
                    <th className="px-4 py-2 border-b text-left text-gray-500">Region</th>
                    <th className="px-4 py-2 border-b text-left text-gray-500">Province</th>
                    <th className="px-4 py-2 border-b text-left text-gray-500">Department</th>
                    <th className="px-4 py-2 border-b text-right text-gray-500">Committed Cost</th>
                    <th className="px-4 py-2 border-b text-right text-gray-500">Reorder Qty</th>
                    <th className="px-4 py-2 border-b text-left text-gray-500">UOM</th>
                  </tr>
                </thead>
                <tbody>
                  {stockBalances.map((balance, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-2 border-b text-gray-500">{mapRegionName(balance.Region)}</td>
                      <td className="px-4 py-2 border-b text-gray-500">{balance.Province}</td>
                      <td className="px-4 py-2 border-b max-w-xs truncate text-gray-500" title={balance.DeptId}>{balance.DeptId}</td>
                      <td className="px-4 py-2 border-b text-right text-gray-500">
                        {balance.CommittedCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="px-4 py-2 border-b text-right text-gray-500">
                        {balance.ReorderQty.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="px-4 py-2 border-b text-gray-500">{balance.UomCd}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-gray-600 bg-gray-50 border border-gray-200 p-4 rounded">
              No stock balance data found for material code: {matCd}
            </div>
          )}
        </div>
      </div>

      {/* Charts Section */}
      {(materials.length > 0 || provinceStocks.length > 0) ? (
        <div className="bg-gray-50 p-4 rounded shadow relative min-h-[400px] flex justify-between gap-6">
          {/* Region-wise Chart */}
          <div className="w-[48%] h-[400px] relative">
            <div className="absolute top-2 left-2 right-20 z-10">
              <h3 className="text-xs font-medium text-gray-600 bg-white px-2 py-1 rounded shadow-sm border leading-tight">
                Material Stock Region Wise - {matCd} {materialName ? `: ${materialName}` : ""}
              </h3>
            </div>
            <div className="absolute top-2 right-2 z-10">
              <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value as "donut" | "bar" | "pie")}
                className="px-2 py-1 text-xs bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="donut">Donut</option>
                <option value="bar">Bar</option>
                <option value="pie">Pie</option>
              </select>
            </div>

            {materials.length > 0 ? (
              <div className="pt-8 h-full">
                {chartType === "donut" && (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={materials}
                        dataKey="QtyOnHand"
                        nameKey="Region"
                        cx="45%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={110}
                        paddingAngle={0}
                        cornerRadius={0}
                      >
                        {materials.map((_, index) => (
                          <Cell key={`donut-${index}`} fill={REGION_COLORS[index % REGION_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={renderCustomTooltip} />
                      <Legend
                        layout="vertical"
                        verticalAlign="middle"
                        align="right"
                        wrapperStyle={{ fontSize: '10px', lineHeight: '1.2' }}
                        formatter={(value: any) => {
                          const match = materials.find((m) => m.Region === value);
                          return `${mapRegionName(value)} (${match?.QtyOnHand})`;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                )}

                {chartType === "bar" && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={materials} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="Region" 
                        tickFormatter={(value) => mapRegionName(value)}
                        fontSize={11}
                      />
                      <YAxis fontSize={11} />
                      <Tooltip content={renderCustomTooltip} />
                      <Bar dataKey="QtyOnHand" fill="#1E40AF" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}

                {chartType === "pie" && (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={materials}
                        dataKey="QtyOnHand"
                        nameKey="Region"
                        cx="45%"
                        cy="50%"
                        outerRadius={110}
                        paddingAngle={0}
                        cornerRadius={0}
                      >
                        {materials.map((_, index) => (
                          <Cell key={`pie-${index}`} fill={REGION_COLORS[index % REGION_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={renderCustomTooltip} />
                      <Legend
                        layout="vertical"
                        verticalAlign="middle"
                        align="right"
                        wrapperStyle={{ fontSize: '10px', lineHeight: '1.2' }}
                        formatter={(value: any) => {
                          const match = materials.find((m) => m.Region === value);
                          return `${mapRegionName(value)} (${match?.QtyOnHand})`;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 italic">
                No region data available
              </div>
            )}
          </div>

          {/* Province-wise Chart */}
          <div className="w-[48%] h-[400px] relative">
            <div className="absolute top-2 left-2 right-20 z-10">
              <h3 className="text-xs font-medium text-gray-600 bg-white px-2 py-1 rounded shadow-sm border leading-tight">
                Material Stock Province Wise - {matCd} {materialName ? `: ${materialName}` : ""}
              </h3>
            </div>
            <div className="absolute top-2 right-2 z-10">
              <select
                value={provinceChartType}
                onChange={(e) => setProvinceChartType(e.target.value as "donut" | "bar" | "pie")}
                className="px-2 py-1 text-xs bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="donut">Donut</option>
                <option value="bar">Bar</option>
                <option value="pie">Pie</option>
              </select>
            </div>

            {provinceLoading ? (
              <div className="flex items-center justify-center h-full text-blue-600">Loading province data...</div>
            ) : provinceError ? (
              <div className="flex items-center justify-center h-full text-red-600 text-xs p-4">
                <div className="text-center">
                  <div className="mb-1">Error loading province data:</div>
                  <div className="text-red-500">{provinceError}</div>
                </div>
              </div>
            ) : provinceStocks.length > 0 ? (
              <div className="pt-8 h-full">
                {provinceChartType === "donut" && (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={provinceStocks}
                        dataKey="QtyOnHand"
                        nameKey="Province"
                        cx="45%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={110}
                        paddingAngle={0}
                        cornerRadius={0}
                      >
                        {provinceStocks.map((_, index) => (
                          <Cell key={`province-donut-${index}`} fill={PROVINCE_COLORS[index % PROVINCE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={renderProvinceTooltip} />
                      <Legend
                        layout="vertical"
                        verticalAlign="middle"
                        align="right"
                        wrapperStyle={{ fontSize: '10px', lineHeight: '1.2' }}
                        formatter={(value: any) => {
                          const match = provinceStocks.find((p) => p.Province === value);
                          return `${value} (${match?.QtyOnHand})`;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                )}

                {provinceChartType === "bar" && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={provinceStocks} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="Province" 
                        fontSize={9}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        interval={0}
                      />
                      <YAxis fontSize={11} />
                      <Tooltip content={renderProvinceTooltip} />
                      <Bar dataKey="QtyOnHand" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}

                {provinceChartType === "pie" && (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={provinceStocks}
                        dataKey="QtyOnHand"
                        nameKey="Province"
                        cx="45%"
                        cy="50%"
                        outerRadius={110}
                        paddingAngle={0}
                        cornerRadius={0}
                      >
                        {provinceStocks.map((_, index) => (
                          <Cell key={`province-pie-${index}`} fill={PROVINCE_COLORS[index % PROVINCE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={renderProvinceTooltip} />
                      <Legend
                        layout="vertical"
                        verticalAlign="middle"
                        align="right"
                        wrapperStyle={{ fontSize: '10px', lineHeight: '1.2' }}
                        formatter={(value: any) => {
                          const match = provinceStocks.find((p) => p.Province === value);
                          return `${value} (${match?.QtyOnHand})`;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 italic">
                No province data available
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center text-sm text-gray-500">
          No chart data found for material code: {matCd}
        </div>
      )}
    </div>
  );
};

export default MaterialDetails;