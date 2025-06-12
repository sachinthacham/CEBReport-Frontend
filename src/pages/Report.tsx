import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import CustomerDetails from "../mainTopics/billing&payment/CustomerDetails";
import MaterialMaster from "../mainTopics/inventory/MaterialMaster";

type Subtopic = {
  id: number;
  name: string;
};

const ReportContent = () => {
  const location = useLocation();
  const subtopics: Subtopic[] = location.state?.subtopics || [];
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [visibleCard, setVisibleCard] = useState<number | null>(null);

  const toggleCard = (id: number) => {
    if (expandedCard === id) {
      setExpandedCard(null);
      setVisibleCard(null);
    } else {
      setExpandedCard(id);
      setVisibleCard(id);
    }
  };

  const renderCardContent = (name: string) => {
    switch (name) {
      case "Customer information":
        return <CustomerDetails />;
      case "Ceylon Electricity Board Material Details":
        return <MaterialMaster />;
      default:
        return <p className="p-4">No content available.</p>;
    }
  };

  return (
    <div className="flex flex-col gap-4 pt-5">
      {subtopics.map((subtopic) => (
        <div key={subtopic.id} className="rounded-lg shadow-md">
          {/* Card Header */}
          <div
            className="p-4 cursor-pointer hover:bg-gray-100 bg-white"
            onClick={() => toggleCard(subtopic.id)}
          >
            <div className="flex items-center gap-2">
              <ChevronDownIcon
                className={`h-5 w-5 text-gray-600 transition-transform duration-300 ${
                  expandedCard === subtopic.id ? "rotate-180" : ""
                }`}
              />
              <h3 className="text-sm">{subtopic.name}</h3>
            </div>
          </div>

          {/* Expandable Content */}
          <div
            className={`overflow-hidden transition-[max-height] duration-1000 ease-in-out bg-[#f8f9fa] ${
              expandedCard === subtopic.id ? "max-h-[1000px]" : "max-h-0"
            }`}
          >
            {visibleCard === subtopic.id && renderCardContent(subtopic.name)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportContent;
