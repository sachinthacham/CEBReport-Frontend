import { useState } from "react";
import { MdPayment } from "react-icons/md";
import { RiBankLine } from "react-icons/ri";
import { FaBoxes } from "react-icons/fa";
import { BsFolder2Open } from "react-icons/bs";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { FaFileUpload } from "react-icons/fa";
import { GiSolarPower } from "react-icons/gi";

const Sidebar = () => {
  const [openTopic, setOpenTopic] = useState<number | null>(null);

  const topics = [
    {
      id: 1,
      title: "Billing And Payments",
      subtopics: ["Financial Statements", "Analysis", "Recievable Positions"],
      icon: <MdPayment />,
    },
    {
      id: 2,
      title: "Finance",
      subtopics: ["Cash book", "PIV", "Financial Statements"],
      icon: <RiBankLine />,
    },
    {
      id: 3,
      title: "Inventory",
      subtopics: [
        "FIFO",
        "Material Master",
        "Quentity On Hards",
        "Issues And GRN",
      ],
      icon: <FaBoxes />,
    },
    {
      id: 4,
      title: "Projects",
      subtopics: ["Application", "Estimation", "Jobs", "Progress"],
      icon: <BsFolder2Open />,
    },
    {
      id: 5,
      title: "Audit",
      subtopics: ["UNT Submission", "Liss Submission"],
      icon: <MdAssignmentTurnedIn />,
    },
    {
      id: 6,
      title: "PUCSSL Submission",
      subtopics: ["UNT Submission", "Liss Submission"],
      icon: <FaFileUpload />,
    },
    {
      id: 7,
      title: "Solar/Procumer",
      subtopics: ["Solar ", "procumer"],
      icon: <GiSolarPower />,
    },
  ];

  const handleToggle = (id: number) => {
    setOpenTopic((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full bg-white min-h-screen p-4 text-[#800000] font-semibold">
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
                  className="p-2 px-4 hover:bg-gray-200 rounded font-normal text-black"
                >
                  {subtopic}
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
