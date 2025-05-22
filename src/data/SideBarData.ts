//these are the side bar topics, subtopic details.

import { MdPayment } from "react-icons/md";
import { RiBankLine } from "react-icons/ri";
import { FaBoxes } from "react-icons/fa";
import { BsFolder2Open } from "react-icons/bs";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { FaFileUpload } from "react-icons/fa";
import { GiSolarPower } from "react-icons/gi";

export const data = [
  {
    id: 1,
    name: "General",
    icon: MdPayment,
    subtopics: [
      "Bill calculation",
      "Amex customers",
      "Listing of customers",
      "List of government accounts",
      "Largest 100 customer details",
    ],
    path: "/report",
  },
  {
    id: 2,
    name: "Billing & Payment",
    icon: RiBankLine,
    subtopics: [
      "Customer information",
      "printed bill information",
      "payment inquiries",
      "Customer balance with latest transactions",
    ],
    path: "/report",
  },
  {
    id: 3,
    name: "Analysis",
    icon: FaBoxes,
    subtopics: [
      "Age analysis",
      "Transaction analysis",
      "Transaction analysis(incl. Prov. Data)",
      "Age analysis for solar customer",
      "Total debtors analysis",
      "Debtors age analysis(individual customers)",
      "Financial analysis",
      "Assessed unit analysis",
    ],
    path: "/report",
  },
  {
    id: 4,
    name: "Collections",
    icon: MdAssignmentTurnedIn,
    subtopics: [
      "Online counter collections",
      "Sales and collection",
      "Stamp duty for payment collections",
      "Monthly revenue collection of different channels",
    ],
    path: "/report",
  },
  {
    id: 5,
    name: "Consumption analysis",
    icon: BsFolder2Open,
    subtopics: [
      "Consumer consumption analysis",
      "Tariff category wise consumption analysis",
      "Business category wise consumption analysis",
      "Transformer wise consumption analysis",
      "Consumption pattern analysis",
      "Assessed meter reading details",
      "Zero consumption details",
    ],
    path: "/report",
  },
  {
    id: 6,
    name: "Solar Information",
    icon: FaFileUpload,
    subtopics: [
      "Solar pv billing information",
      "Solar PV capacity information",
      "Solar progress clarification (ordinary)",
      "Solar payment information – retail",
      "Solar payment information – Bulk",
      "Solar connection details (incl. Reading and usage) - retail",
      "Solar connection details (incl. Reading and usage) - bulk",
      "Solar progress clarification – Bulk",
      "Solar customer information",
    ],
    path: "/report",
  },
  {
    id: 7,
    name: "PUCSL/LISS",
    icon: GiSolarPower,
    subtopics: [
      "LISS submission – retail journal adjustments",
      "PUCSL Reports (LISS Data)",
      "PUCSL Reports – solar connections (New)",
      "Solar data for UNT calculation]",
    ],
    path: "/report",
  },
];
// const topics = [
//     {
//       id: 1,
//       title: "Billing And Payments",
//       icon: <MdPayment />,
//       subtopics: [
//         { name: "Financial Statements", route: "/billing/financial" },
//         { name: "Bill & Payment Inquiries", route: "/billing" },
//         { name: "Receivable Positions", route: "/billing/receivables" },
//       ],
//     },
//     {
//       id: 2,
//       title: "Finance",
//       icon: <RiBankLine />,
//       subtopics: [
//         { name: "Cash Book", route: "/finance/cashbook" },
//         { name: "PIV", route: "/finance/piv" },
//         { name: "Financial Statements", route: "/finance/statements" },
//       ],
//     },
//     {
//       id: 3,
//       title: "Inventory",
//       icon: <FaBoxes />,
//       subtopics: [
//         { name: "FIFO", route: "/inventory/fifo" },
//         { name: "Material Master", route: "/inventory/material-master" },
//         { name: "Quantity On Hands", route: "/inventory/quantity" },
//         { name: "Issues And GRN", route: "/inventory/issues-grn" },
//       ],
//     },
//     {
//       id: 4,
//       title: "Projects",
//       icon: <BsFolder2Open />,
//       subtopics: [
//         { name: "Application", route: "/projects/application" },
//         { name: "Estimation", route: "/projects/estimation" },
//         { name: "Jobs", route: "/projects/jobs" },
//         { name: "Progress", route: "/projects/progress" },
//       ],
//     },
//     {
//       id: 5,
//       title: "Audit",
//       icon: <MdAssignmentTurnedIn />,
//       subtopics: [
//         { name: "UNT Submission", route: "/audit/unt-submission" },
//         { name: "Liss Submission", route: "/audit/liss-submission" },
//       ],
//     },
//     {
//       id: 6,
//       title: "PUCSL Submission",
//       icon: <FaFileUpload />,
//       subtopics: [
//         { name: "UNT Submission", route: "/pucsl/unt-submission" },
//         { name: "Liss Submission", route: "/pucsl/liss-submission" },
//       ],
//     },
//     {
//       id: 7,
//       title: "Solar/Procumer",
//       icon: <GiSolarPower />,
//       subtopics: [
//         { name: "Solar", route: "/solar/solar" },
//         { name: "Procumer", route: "/solar/procumer" },
//       ],
//     },
//   ];
