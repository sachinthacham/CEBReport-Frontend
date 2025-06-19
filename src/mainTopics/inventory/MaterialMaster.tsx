import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Material {
  MatCd: string;
  MatNm: string;
}

interface MaterialMasterProps {
  title?: string;
}

const MaterialMaster: React.FC<MaterialMasterProps> = ({
  title = "Material Details",
}) => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [searchTermName, setSearchTermName] = useState("");
  const [searchTermCode, setSearchTermCode] = useState("");
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 50;
  const navigate = useNavigate();

  useEffect(() => {
    const loadMaterials = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/misapi/api/materials");
        const text = await response.text();
        console.log("API raw response:", text);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data: Material[] = [];
        try {
          const result = JSON.parse(text);
          if (Array.isArray(result)) {
            data = result;
          } else if (result.data && Array.isArray(result.data)) {
            data = result.data;
          }
        } catch (e) {
          throw new Error("Response is not valid JSON.");
        }
        setMaterials(data);
        setFilteredMaterials(data);
        setLastUpdated(new Date());
      } catch (err: any) {
        setError(err.message || "Failed to load materials.");
        setMaterials([]);
        setFilteredMaterials([]);
      } finally {
        setLoading(false);
      }
    };

    loadMaterials();
  }, []);

  useEffect(() => {
    if (searchTermName.trim() === "" && searchTermCode.trim() === "") {
      setFilteredMaterials(materials);
    } else {
      const filtered = materials.filter((material) => {
        const nameMatch =
          searchTermName.trim() === "" ||
          material.MatNm.toLowerCase().includes(searchTermName.toLowerCase());
        const codeMatch =
          searchTermCode.trim() === "" ||
          material.MatCd.toLowerCase().includes(searchTermCode.toLowerCase());
        return nameMatch && codeMatch;
      });
      setFilteredMaterials(filtered);
    }
  }, [searchTermName, searchTermCode, materials]);

  // Calculate paginated materials
  const paginatedMaterials = filteredMaterials.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Update page if filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredMaterials]);

  const clearAllFilters = () => {
    setSearchTermName("");
    setSearchTermCode("");
  };

  const handleView = (matCd: string) => {
    console.log("handleView called with matCd:", matCd);
    console.log("Current location:", window.location.href);
    navigate(`/report/inventory/material-details/${matCd}`);
    console.log(
      "Navigation attempted to:",
      `/report/inventory/material-details/${matCd}`
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8 text-blue-600 text-xs font-sans">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 bg-red-50 border border-red-200 p-3 rounded text-xs font-sans">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow font-sans">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-base font-semibold text-gray-800">
          {title} - Total: {filteredMaterials.length}
        </h2>
        {lastUpdated && (
          <span className="text-[10px] text-gray-500">
            Last updated: {lastUpdated.toLocaleString()}
          </span>
        )}
      </div>

      <div className="flex justify-end items-center gap-2 mb-3">
        <input
          type="text"
          placeholder="Search by Material Code..."
          value={searchTermCode}
          onChange={(e) => setSearchTermCode(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:border-purple-500 transition w-48"
        />
        <input
          type="text"
          placeholder="Search by Material Name..."
          value={searchTermName}
          onChange={(e) => setSearchTermName(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:border-purple-500 transition w-48"
        />
        {(searchTermName || searchTermCode) && (
          <button
            onClick={clearAllFilters}
            className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded transition-colors"
            title="Clear all filters"
          >
            Clear
          </button>
        )}
      </div>

      {filteredMaterials.length === 0 ? (
        <div className="text-gray-600 bg-gray-50 border border-gray-200 p-3 rounded text-xs">
          No materials found.
        </div>
      ) : (
        <div className="overflow-x-auto border border-gray-200 rounded">
          <div className="max-h-80 overflow-y-auto">
            <table className="w-full text-xs text-gray-700 table-fixed">
              <thead className="bg-purple-100 text-[11px] text-gray-700 sticky top-0 z-10 shadow">
                <tr>
                  <th className="w-1/4 px-4 py-2 text-left font-medium">
                    Material Code
                  </th>
                  <th className="w-1/2 px-4 py-2 text-left font-medium">
                    Material Name
                  </th>
                  <th className="w-1/4 px-4 py-2 text-center font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedMaterials.map((material, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-purple-50 transition-colors border-b"
                  >
                    <td className="w-1/4 px-4 py-3 truncate">
                      {material.MatCd}
                    </td>
                    <td className="w-1/2 px-4 py-3 truncate">
                      {material.MatNm}
                    </td>
                    <td className="w-1/4 px-4 py-3 text-center">
                      <button
                        onClick={() => {
                          console.log(
                            "View button clicked for matCd:",
                            material.MatCd
                          );
                          handleView(material.MatCd);
                        }}
                        className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-md shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 min-w-[70px]"
                      >
                        <svg
                          className="w-3 h-3 mr-1.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="flex justify-end items-center gap-2 mt-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-2 py-1 text-xs bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-xs">
          Page {currentPage} of {Math.ceil(filteredMaterials.length / pageSize)}
        </span>
        <button
          disabled={
            currentPage === Math.ceil(filteredMaterials.length / pageSize)
          }
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-2 py-1 text-xs bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MaterialMaster;
