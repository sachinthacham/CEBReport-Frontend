import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/Store";
import {
  fetchOrdinarySales,
  fetchBulkSales,
  clearSalesData,
} from "../../redux/slices/SalesSlice";
import SalesForm from "../../components/mainTopics/general/SalesForm";
import SalesReportTable from "../../components/mainTopics/general/SalesReportTable";

const SalesReports: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { formData, ordinarySalesData, bulkSalesData, loading, error } =
    useSelector((state: RootState) => state.sales);

  // Clear data when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearSalesData());
    };
  }, [dispatch]);

  const handleFormSubmit = async (details: {
    billCycle: number;
    customerType: "ordinary" | "bulk";
  }) => {
    // Clear previous data
    dispatch(clearSalesData());

    // Call the appropriate API based on customer type selection
    if (details.customerType === "ordinary") {
      dispatch(fetchOrdinarySales(details));
    } else {
      dispatch(fetchBulkSales(details));
    }
  };

  return (
    <div className="p-2 sm:p-2 md:p-1 w-full max-w-[2000px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <p className="text-gray-600 text-sm">
          Generate sales reports for ordinary and bulk customers
        </p>
      </div>

      {/* Form Section */}
      <div className="w-full flex flex-col gap-2 sm:gap-4 text-sm mb-6">
        <SalesForm onSubmit={handleFormSubmit} />
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Results Section */}
      <div className="w-full">
        {formData.customerType === "ordinary" ? (
          // Display ordinary sales data
          <SalesReportTable
            data={ordinarySalesData}
            title="Ordinary Sales Report"
            loading={loading}
          />
        ) : (
          // Display bulk sales data
          <SalesReportTable
            data={bulkSalesData}
            title="Bulk Sales Report"
            loading={loading}
          />
        )}
      </div>

      {/* Customer Type and Bill Cycle Indicator */}
      {formData.billCycle > 0 && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-800">
                Customer Type:{" "}
                <span className="font-medium capitalize">
                  {formData.customerType}
                </span>{" "}
                | Bill Cycle:{" "}
                <span className="font-medium">{formData.billCycle}</span>
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Showing {formData.customerType} sales data for the selected bill
                cycle
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesReports;
