import { postJSON } from "../../../../helpers/LoginHelper";
import {
  Transaction,
  CustomerTransactionHistory,
  RawTransaction,
} from "../../../../data/DataTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/Store";

import { useEffect, useState, useRef } from "react";

const TransactionHistoryReport = () => {
  const [data, setData] = useState<CustomerTransactionHistory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const { acctNo, FbillCycle, TbillCycle } = useSelector(
    (state: RootState) => state.billing
  );

  useEffect(() => {
    if (!acctNo || FbillCycle === undefined || TbillCycle === undefined) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const payload = {
          acctNo: acctNo,
          FbillCycle: FbillCycle,
          TbillCycle: TbillCycle,
        };

        const result = await postJSON(
          "/CEBINFO_API_2025/api/OrdinaryCusTransaction",
          payload
        );

        const customer = result.customerMasDetail;
        let transactions = (result.customerTransDetail || []).map(
          (t: RawTransaction) => ({
            billMonth: t.yrMnth || t.billCycle || "",
            billCycle: t.billCycle,
            yrMnth: t.yrMnth || "",
            Days: t.days || "",
            Units: t.units || "",
            acctNumber: t.acctNumber || "",
            transactionDate: t.transDate || "",
            description: t.transType || "",
            transactionAmount:
              t.transAmt !== undefined && t.transAmt !== null
                ? t.transAmt.toFixed(2) + (t.balDrCr ? " " + t.balDrCr : "")
                : "",
            balance:
              t.balance !== undefined && t.balance !== null
                ? t.balance.toFixed(2) + (t.balDrCr ? " " + t.balDrCr : "")
                : "",
          })
        );

        transactions = transactions.filter((t: Transaction) => {
          const cycle = Number(t.billCycle);
          return !isNaN(cycle) && cycle >= FbillCycle && cycle <= TbillCycle;
        });

        setData({
          accountNumber: customer.acctNumber || "",
          name: customer.name || "",
          address: customer.address || "",
          tariff: customer.tariff || "",
          area: customer.areaName || "",
          wlkOdr: customer.wlkOdr || "",
          met1: customer.met1 || "",
          met2: customer.met2 || "",
          met3: customer.met3 || "",
          province: customer.province || "",
          netType: customer.netType || "",
          date: new Date().toLocaleString(), // <-- real-time date here
          balance:
            transactions.length > 0
              ? transactions[transactions.length - 1].balance
              : "",
          transactions,
        });
      } catch (error: any) {
        setError(error.message || "Failed to fetch report data");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [acctNo, FbillCycle, TbillCycle]);

  // Download as Excel (CSV)
  const downloadAsCSV = () => {
    if (!data) return;
    const csvRows = [
      [
        "Bill Month",
        "Year & Month",
        "Days",
        "Units",
        "Transaction Date",
        "Description",
        "Transaction Amount",
        "Balance",
      ],
      ...data.transactions.map((t) => [
        t.billCycle,
        t.yrMnth,
        t.Days,
        t.Units,
        t.transactionDate,
        t.description,
        t.transactionAmount,
        t.balance,
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
      `TransactionHistory_${data.accountNumber}.csv`
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

  if (loading)
    return (
      <div className="flex justify-center items-center py-8 text-blue-600">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-red-600 bg-red-50 border border-red-200 p-4 rounded">
        Error: {error}
      </div>
    );
  if (!data)
    return (
      <div className="text-gray-600 bg-gray-50 border border-gray-200 p-4 rounded">
        No data found or invalid data received from the API.
      </div>
    );

  return (
    <div
      className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow"
      ref={printRef}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-purple-700">
          Transaction History - Account: {data.accountNumber}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={printPDF}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Print PDF
          </button>
          <button
            onClick={downloadAsCSV}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Download Excel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 mt-3">
        <div>
          <div className="flex mb-2">
            <div className="text-gray-700 font-semibold mr-2">
              Account Number:
            </div>
            <div className="text-gray-900">{data.accountNumber}</div>
          </div>
          <div className="flex mb-2">
            <div className="text-gray-700 font-semibold mr-2">Name:</div>
            <div className="text-gray-900">{data.name}</div>
          </div>
          <div className="flex mb-2">
            <div className="text-gray-700 font-semibold mr-2">Tariff:</div>
            <div className="text-gray-900">{data.tariff}</div>
          </div>
          <div className="flex mb-2">
            <div className="text-gray-700 font-semibold mr-2">Wald Order:</div>
            <div className="text-gray-900">{data.wlkOdr}</div>
          </div>
          <div className="flex mb-2">
            <div className="text-gray-700 font-semibold mr-2">Address:</div>
            <div className="text-gray-900">{data.address}</div>
          </div>
          <div className="flex mb-2">
            <div className="text-gray-700 font-semibold mr-2">Date:</div>
            <div className="text-gray-900">{data.date}</div>
          </div>
        </div>
        <div>
          <div className="flex mb-2">
            <div className="text-gray-700 font-semibold mr-2">Province:</div>
            <div className="text-gray-900">{data.province}</div>
          </div>
          <div className="flex mb-2">
            <div className="text-gray-700 font-semibold mr-2">Area:</div>
            <div className="text-gray-900">{data.area}</div>
          </div>
          <div className="flex mb-2">
            <div className="text-gray-700 font-semibold mr-2">Meter 1:</div>
            <div className="text-gray-900">{data.met1}</div>
          </div>
          <div className="flex mb-2">
            <div className="text-gray-700 font-semibold mr-2">Meter 2:</div>
            <div className="text-gray-900">{data.met2}</div>
          </div>
          <div className="flex mb-2">
            <div className="text-gray-700 font-semibold mr-2">Meter 3:</div>
            <div className="text-gray-900">{data.met3}</div>
          </div>
          <div className="flex mb-2">
            <div className="text-gray-700 font-semibold mr-2">Net Type:</div>
            <div className="text-gray-900">{data.netType}</div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-2">Transactions</h3>
      {data.transactions.length === 0 ? (
        <p className="text-gray-600">No transactions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded">
            <thead className="bg-purple-100">
              <tr>
                <th className="px-4 py-2 border-b text-left">Bill Cycle</th>
                <th className="px-4 py-2 border-b text-left">Year & Month</th>
                <th className="px-4 py-2 border-b text-left">Days</th>
                <th className="px-4 py-2 border-b text-left">Units</th>
                <th className="px-4 py-2 border-b text-left">
                  Transaction Date
                </th>
                <th className="px-4 py-2 border-b text-left">Description</th>
                <th className="px-4 py-2 border-b text-right">
                  Transaction Amount
                </th>
                <th className="px-4 py-2 border-b text-right">Balance</th>
              </tr>
            </thead>
            <tbody>
              {data.transactions.map((t, idx) => (
                <tr
                  key={idx}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-2 border-b">{t.billCycle}</td>
                  <td className="px-4 py-2 border-b">{t.yrMnth}</td>
                  <td className="px-4 py-2 border-b">{t.Days}</td>
                  <td className="px-4 py-2 border-b">{t.Units}</td>
                  <td className="px-4 py-2 border-b">{t.transactionDate}</td>
                  <td className="px-4 py-2 border-b">{t.description}</td>
                  <td className="px-4 py-2 border-b text-right">
                    {t.transactionAmount}
                  </td>
                  <td className="px-4 py-2 border-b text-right">{t.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionHistoryReport;
