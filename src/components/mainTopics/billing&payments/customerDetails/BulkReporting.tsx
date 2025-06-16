import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/Store";

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
interface BulkReportingProps {
  onClose: () => void;
}

const BulkReporting = ({ onClose }: BulkReportingProps) => {
  const [rows, setRows] = useState<BulkReportRow[]>([]);
  const [customer, setCustomer] = useState<CustomerDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

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
      className="mx-auto p-2 sm:p-4 bg-white rounded-lg shadow relative"
      style={{ width: "100%", maxWidth: "100%" }}
      ref={printRef}
    >
      <button
        onClick={onClose}
        className="absolute top-1 right-1 sm:top-2 sm:right-2 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Close"
      >
        <span className="text-xl sm:text-2xl font-bold">×</span>
      </button>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-6 mt-6 sm:mt-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-purple-700 break-words">
          Billing Details : {customer?.acctNumber}
        </h2>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={printPDF}
            className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Print PDF
          </button>
          <button
            onClick={downloadAsCSV}
            className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Download Excel
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-blue-600 text-sm sm:text-base">Loading...</div>
      )}
      {error && (
        <div className="text-red-600 text-sm sm:text-base">{error}</div>
      )}

      {/* Customer Details */}
      {customer && (
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 rounded border border-gray-200">
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm">
            <div className="break-words">
              <strong>Account Number:</strong> {customer.acctNumber}
            </div>
            <div className="break-words">
              <strong>Name:</strong> {customer.name}
            </div>
            <div className="break-words">
              <strong>Address:</strong> {customer.address}
            </div>
            <div>
              <strong>Date:</strong> {new Date().toLocaleDateString()}
            </div>
            <div>
              <strong>Tariff:</strong> {customer.tariff}
            </div>
            <div>
              <strong>Walk Order:</strong> {customer.wlkOdr}
            </div>
            <div>
              <strong>Province:</strong> {customer.province}
            </div>
            <div>
              <strong>Area:</strong> {customer.areaName}
            </div>
          </div>
        </div>
      )}

      {/* Transaction Table */}
      {rows.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-300">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-purple-100">
                  <tr>
                    <th className="px-2 sm:px-3 py-1.5 sm:py-2 text-left text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Bill Month
                    </th>
                    <th className="px-2 sm:px-3 py-1.5 sm:py-2 text-left text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Year
                    </th>
                    <th className="px-2 sm:px-3 py-1.5 sm:py-2 text-left text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">
                      TXN/Read Date
                    </th>
                    <th className="px-2 sm:px-3 py-1.5 sm:py-2 text-left text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Trans. Description
                    </th>
                    <th className="px-2 sm:px-3 py-1.5 sm:py-2 text-left text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Current Reading
                    </th>
                    <th className="px-2 sm:px-3 py-1.5 sm:py-2 text-left text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Total Units
                    </th>
                    <th className="px-2 sm:px-3 py-1.5 sm:py-2 text-left text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Rate
                    </th>
                    <th className="px-2 sm:px-3 py-1.5 sm:py-2 text-left text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Amount
                    </th>
                    <th className="px-2 sm:px-3 py-1.5 sm:py-2 text-left text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Monthly Charge
                    </th>
                    <th className="px-2 sm:px-3 py-1.5 sm:py-2 text-left text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Payment
                    </th>
                    <th className="px-2 sm:px-3 py-1.5 sm:py-2 text-left text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Debits
                    </th>
                    <th className="px-2 sm:px-3 py-1.5 sm:py-2 text-left text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Credits
                    </th>
                    <th className="px-2 sm:px-3 py-1.5 sm:py-2 text-left text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Amount Due
                    </th>
                    <th className="px-2 sm:px-3 py-1.5 sm:py-2 text-left text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Due Dr/Cr
                    </th>
                    <th className="px-2 sm:px-3 py-1.5 sm:py-2 text-left text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Balance
                    </th>
                    <th className="px-2 sm:px-3 py-1.5 sm:py-2 text-left text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">
                      Balance Dr/Cr
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {rows.map((row, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm whitespace-nowrap">
                        {displayCell(row.billCycle)}
                      </td>
                      <td className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm whitespace-nowrap">
                        {displayCell(row.year)}
                      </td>
                      <td className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm whitespace-nowrap">
                        {displayCell(row.transDate)}
                      </td>
                      <td className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm whitespace-nowrap">
                        {displayCell(row.transType)}
                      </td>
                      <td className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm whitespace-nowrap">
                        {displayCell(row.reading)}
                      </td>
                      <td className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm whitespace-nowrap">
                        {displayCell(row.units)}
                      </td>
                      <td className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm whitespace-nowrap">
                        {displayCell(row.rate)}
                      </td>
                      <td className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm whitespace-nowrap">
                        {displayCell(row.amount)}
                      </td>
                      <td className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm whitespace-nowrap">
                        {displayCell(row.monthlyChg)}
                      </td>
                      <td className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm whitespace-nowrap">
                        {displayCell(row.payments)}
                      </td>
                      <td className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm whitespace-nowrap">
                        {displayCell(row.debits)}
                      </td>
                      <td className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm whitespace-nowrap">
                        {displayCell(row.credits)}
                      </td>
                      <td className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm whitespace-nowrap">
                        {displayCell(row.dueAmount)}
                      </td>
                      <td className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm whitespace-nowrap">
                        {displayCell(row.dueAmtDrCr)}
                      </td>
                      <td className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm whitespace-nowrap">
                        {displayCell(row.balance)}
                      </td>
                      <td className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm whitespace-nowrap">
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
          <div className="text-gray-600 text-sm sm:text-base">
            No data found.
          </div>
        )
      )}
    </div>
  );
};

export default BulkReporting;
