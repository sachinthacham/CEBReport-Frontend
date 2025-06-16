import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import CustomerDetails from "../mainTopics/billing&payment/CustomerDetails";
import MaterialMaster from "../mainTopics/inventory/MaterialMaster";
import { data as sidebarData } from "../data/SideBarData";

type Subtopic = {
  id: number;
  name: string;
};

const ReportContent = () => {
  const location = useLocation();
  const [subtopics, setSubtopics] = useState<Subtopic[]>([]);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [visibleCard, setVisibleCard] = useState<number | null>(null);

  useEffect(() => {
    // Get subtopics from location state if available
    if (location.state?.subtopics) {
      setSubtopics(location.state.subtopics);
    } else {
      // Otherwise, get subtopics from SideBarData based on current path
      const currentPath = location.pathname;
      const currentTopic = sidebarData.find(
        (topic) => topic.path === currentPath
      );
      if (currentTopic) {
        setSubtopics(currentTopic.subtopics);
        // Auto-expand the first subtopic
        if (currentTopic.subtopics.length > 0) {
          setExpandedCard(currentTopic.subtopics[0].id);
          setVisibleCard(currentTopic.subtopics[0].id);
        }
      }
    }
  }, [location]);

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
