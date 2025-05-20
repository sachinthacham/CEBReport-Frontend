import { useState } from "react";
import { MdPayment } from "react-icons/md";
import { RiBankLine } from "react-icons/ri";
import { FaBoxes } from "react-icons/fa";
import { BsFolder2Open } from "react-icons/bs";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { FaFileUpload } from "react-icons/fa";
import { GiSolarPower } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [openTopic, setOpenTopic] = useState<number | null>(null);
  const navigate = useNavigate();

  const topics = [
    {
      id: 1,
      title: "Billing And Payments",
      icon: <MdPayment />,
      subtopics: [
        { name: "Financial Statements", route: "/billing/financial" },
        { name: "Bill & Payment Inquiries", route: "/billing" },
        { name: "Receivable Positions", route: "/billing/receivables" },
      ],
    },
    {
      id: 2,
      title: "Finance",
      icon: <RiBankLine />,
      subtopics: [
        { name: "Cash Book", route: "/finance/cashbook" },
        { name: "PIV", route: "/finance/piv" },
        { name: "Financial Statements", route: "/finance/statements" },
      ],
    },
    {
      id: 3,
      title: "Inventory",
      icon: <FaBoxes />,
      subtopics: [
        { name: "FIFO", route: "/inventory/fifo" },
        { name: "Material Master", route: "/inventory/material-master" },
        { name: "Quantity On Hands", route: "/inventory/quantity" },
        { name: "Issues And GRN", route: "/inventory/issues-grn" },
      ],
    },
    {
      id: 4,
      title: "Projects",
      icon: <BsFolder2Open />,
      subtopics: [
        { name: "Application", route: "/projects/application" },
        { name: "Estimation", route: "/projects/estimation" },
        { name: "Jobs", route: "/projects/jobs" },
        { name: "Progress", route: "/projects/progress" },
      ],
    },
    {
      id: 5,
      title: "Audit",
      icon: <MdAssignmentTurnedIn />,
      subtopics: [
        { name: "UNT Submission", route: "/audit/unt-submission" },
        { name: "Liss Submission", route: "/audit/liss-submission" },
      ],
    },
    {
      id: 6,
      title: "PUCSL Submission",
      icon: <FaFileUpload />,
      subtopics: [
        { name: "UNT Submission", route: "/pucsl/unt-submission" },
        { name: "Liss Submission", route: "/pucsl/liss-submission" },
      ],
    },
    {
      id: 7,
      title: "Solar/Procumer",
      icon: <GiSolarPower />,
      subtopics: [
        { name: "Solar", route: "/solar/solar" },
        { name: "Procumer", route: "/solar/procumer" },
      ],
    },
  ];

  const handleToggle = (id: number) => {
    setOpenTopic((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full bg-white min-h-screen p-4 text-[#800000] font-semibold cursor-pointer">
      {topics.map((topic) => (
        <div key={topic.id} className="mb-2">
          <div
            className="bg-white p-3 rounded shadow cursor-pointer hover:bg-gray-200"
            onClick={() => handleToggle(topic.id)}
          >
            <div className="flex justify-between items-center">
              <div className="flex justify-around items-center">
                <div className="px-2">{topic.icon}</div>
                <div>{topic.title}</div>
              </div>

              <div>{openTopic === topic.id ? "−" : "+"}</div>
            </div>
          </div>
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              openTopic === topic.id
                ? "max-h-40 opacity-100 mt-2"
                : "max-h-0 opacity-0"
            } bg-gray-50 rounded shadow-inner`}
          >
            <div className="p-2">
              {topic.subtopics.map((subtopic, index) => (
                <div
                  key={index}
                  onClick={() => navigate(subtopic.route)}
                  className="p-2 px-4 hover:bg-gray-200 rounded font-normal text-black"
                >
                  {subtopic.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
