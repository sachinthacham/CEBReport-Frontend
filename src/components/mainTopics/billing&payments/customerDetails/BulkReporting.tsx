import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/Store";
import {
  FaArrowLeft,
  FaFileDownload,
  FaPrint,
  FaUserCircle,
  FaMapMarkerAlt,
  FaHome,
  FaBolt,
  FaListOl,
  FaCalendarAlt,
  FaBalanceScale,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface CustomerDetails {
  acctNumber: string;
  name: string;
  address: string;
  tariff: string;
  wlkOdr: string;
  province: string;
  areaName: string;
}

interface BulkReportRow {
  billCycle: string;
  year: string;
  transDate: string | null;
  transType: string;
  reading: string | null;
  units: string | null;
  rate: number | null;
  amount: number | null;
  monthlyChg: number | null;
  payments: number | null;
  debits: number | null;
  credits: number | null;
  dueAmount: number | null;
  dueAmtDrCr?: string | null;
  balance: number | null;
  balanceDrCr: string | null;
}

const BulkReporting = () => {
  const [rows, setRows] = useState<BulkReportRow[]>([]);
  const [customer, setCustomer] = useState<CustomerDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const printRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { acctNo, FbillCycle, TbillCycle } = useSelector(
    (state: RootState) => state.billing
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setRows([]);
      setCustomer(null);

      try {
        const endpoint = "/CEBINFO_API_2025/api/bulkBreakup5";
        const payload = { acctNo, FbillCycle, TbillCycle };

        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error("Bulk API error");
        const apiData = await response.json();

        // Extract customer details
        if (apiData.customerMasDetail) {
          setCustomer({
            acctNumber: apiData.customerMasDetail.acctNumber || "",
            name: apiData.customerMasDetail.name || "",
            address: apiData.customerMasDetail.address || "",
            tariff: apiData.customerMasDetail.tariff || "",
            wlkOdr: apiData.customerMasDetail.wlkOdr || "",
            province: apiData.customerMasDetail.province || "",
            areaName: apiData.customerMasDetail.areaName || "",
          });
        }

        // Extract transaction rows
        const dataArray =
          apiData.customerTransDetail ||
          apiData.details ||
          apiData.data ||
          (Array.isArray(apiData) ? apiData : []);

        const mappedRows: BulkReportRow[] = dataArray.map((item: any) => ({
          billCycle: item.billCycle || "",
          year: item.year || "",
          transDate: item.transDate || "",
          transType: item.transType || "",
          reading: item.reading || "",
          units: item.units || "",
          rate: item.rate ?? null,
          amount: item.amount ?? null,
          monthlyChg: item.monthlyChg ?? null,
          payments: item.payments ?? null,
          debits: item.debits ?? null,
          credits: item.credits ?? null,
          dueAmount: item.dueAmount ?? null,
          dueAmtDrCr: item.dueAmtDrCr || null,
          balance: item.balance ?? null,
          balanceDrCr: item.balanceDrCr || "",
        }));

        setRows(mappedRows);
      } catch (err: any) {
        setError(err.message || "Failed to fetch data");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (acctNo && FbillCycle && TbillCycle) {
      fetchData();
    }
  }, [acctNo, FbillCycle, TbillCycle]);

  const downloadAsCSV = () => {
    if (!rows.length) return;
    const csvRows = [
      [
        "Bill Month",
        "Year",
        "TXN/Read Date",
        "Trans. Description",
        "Current Reading",
        "Total Units",
        "Rate",
        "Amount",
        "Total Monthly Charge",
        "Payment",
        "Debits",
        "Credits",
        "Total Amount Due",
        "Balance",
      ],
      ...rows.map((row) => [
        row.billCycle,
        row.year,
        row.transDate,
        row.transType,
        row.reading,
        row.units,
        row.rate,
        row.amount,
        row.monthlyChg,
        row.payments,
        row.debits,
        row.credits,
        row.dueAmount,
        row.dueAmtDrCr || "",
        row.balance + " " + (row.balanceDrCr || ""),
      ]),
    ];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvRows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `BulkReport_${customer?.acctNumber || "bulk"}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print as PDF
  const printPDF = () => {
    if (!printRef.current) return;
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  // Helper function to display empty cell for zero, null, or empty string
  const displayCell = (value: string | number | null | undefined) =>
    value == null || value === "" || value === 0 || value === "0" ? "" : value;

  return (
    <div
      className="max-w-6xl mx-auto p-4 bg-white rounded-lg shadow border border-gray-100 relative"
      ref={printRef}
      style={{ width: "100%", maxWidth: "100%" }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate("/report/billing-payment")}
        className="mb-4 flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded hover:bg-gray-200 transition border border-gray-200"
      >
        <FaArrowLeft className="w-3 h-3" />
        Back to Charts
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-6 mt-2">
        <div className="flex items-center gap-2 mb-2 sm:mb-0">
          <FaListOl className="w-5 h-5 text-gray-400" />
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 tracking-tight break-words">
            Bulk Billing Details
          </h2>
          <span className="ml-2 text-xs text-gray-500 font-normal">
            Account:{" "}
            <span className="text-gray-700 font-semibold">
              {customer?.acctNumber}
            </span>
          </span>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={printPDF}
            className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 text-xs rounded border border-gray-200 hover:bg-gray-200 transition"
          >
            <FaPrint className="w-3 h-3" /> Print PDF
          </button>
          <button
            onClick={downloadAsCSV}
            className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 text-xs rounded border border-gray-200 hover:bg-gray-200 transition"
          >
            <FaFileDownload className="w-3 h-3" /> Download Excel
          </button>
        </div>
      </div>

      {/* Customer Details */}
      {customer && (
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 rounded border border-gray-200">
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm">
            <div className="break-words flex items-center gap-1">
              <FaUserCircle className="text-gray-300 w-4 h-4" />{" "}
              <span>
                <strong>Account:</strong> {customer.acctNumber}
              </span>
            </div>
            <div className="break-words flex items-center gap-1">
              <FaUserCircle className="text-gray-300 w-4 h-4" />{" "}
              <span>
                <strong>Name:</strong> {customer.name}
              </span>
            </div>
            <div className="break-words flex items-center gap-1">
              <FaHome className="text-gray-300 w-4 h-4" />{" "}
              <span>
                <strong>Address:</strong> {customer.address}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <FaCalendarAlt className="text-gray-300 w-4 h-4" />{" "}
              <span>
                <strong>Date:</strong> {new Date().toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <FaBalanceScale className="text-gray-300 w-4 h-4" />{" "}
              <span>
                <strong>Tariff:</strong> {customer.tariff}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <FaListOl className="text-gray-300 w-4 h-4" />{" "}
              <span>
                <strong>Walk Order:</strong> {customer.wlkOdr}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-gray-300 w-4 h-4" />{" "}
              <span>
                <strong>Province:</strong> {customer.province}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <FaBolt className="text-gray-300 w-4 h-4" />{" "}
              <span>
                <strong>Area:</strong> {customer.areaName}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Transaction Table */}
      {rows.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 text-xs">
                <thead className="bg-gray-100 sticky top-0 z-10">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-gray-700 whitespace-nowrap">
                      Bill Month
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-gray-700 whitespace-nowrap">
                      Year
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-gray-700 whitespace-nowrap">
                      TXN/Read Date
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-gray-700 whitespace-nowrap">
                      Trans. Description
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-gray-700 whitespace-nowrap">
                      Current Reading
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-gray-700 whitespace-nowrap">
                      Total Units
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-gray-700 whitespace-nowrap">
                      Rate
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-gray-700 whitespace-nowrap">
                      Amount
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-gray-700 whitespace-nowrap">
                      Monthly Charge
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-gray-700 whitespace-nowrap">
                      Payment
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-gray-700 whitespace-nowrap">
                      Debits
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-gray-700 whitespace-nowrap">
                      Credits
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-gray-700 whitespace-nowrap">
                      Amount Due
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-gray-700 whitespace-nowrap">
                      Due Dr/Cr
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-gray-700 whitespace-nowrap">
                      Balance
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-gray-700 whitespace-nowrap">
                      Balance Dr/Cr
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {rows.map((row, idx) => (
                    <tr
                      key={idx}
                      className={
                        idx % 2 === 0
                          ? "bg-white hover:bg-gray-50 transition"
                          : "bg-gray-50 hover:bg-gray-100 transition"
                      }
                    >
                      <td className="px-3 py-2 whitespace-nowrap text-gray-700">
                        {displayCell(row.billCycle)}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-gray-700">
                        {displayCell(row.year)}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-gray-700">
                        {displayCell(row.transDate)}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-gray-700">
                        {displayCell(row.transType)}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-gray-700">
                        {displayCell(row.reading)}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-gray-700">
                        {displayCell(row.units)}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-gray-800 font-medium">
                        {displayCell(row.rate)}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-gray-800 font-medium">
                        {displayCell(row.amount)}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-gray-800 font-medium">
                        {displayCell(row.monthlyChg)}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-gray-800 font-medium">
                        {displayCell(row.payments)}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-gray-800 font-medium">
                        {displayCell(row.debits)}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-gray-800 font-medium">
                        {displayCell(row.credits)}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-gray-800 font-medium">
                        {displayCell(row.dueAmount)}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-gray-800 font-medium">
                        {displayCell(row.dueAmtDrCr)}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-gray-800 font-medium">
                        {displayCell(row.balance)}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-gray-800 font-medium">
                        {displayCell(row.balanceDrCr)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        !loading && (
          <div className="text-gray-600 text-xs sm:text-sm">No data found.</div>
        )
      )}
    </div>
  );
};

export default BulkReporting;
