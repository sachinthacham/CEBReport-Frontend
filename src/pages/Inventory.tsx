import { useState, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { data as sidebarData } from "../data/SideBarData";
import MaterialMaster from "../mainTopics/inventory/MaterialMaster";

type Subtopic = {
  id: number;
  name: string;
};

const Inventory = () => {
  const [subtopics, setSubtopics] = useState<Subtopic[]>([]);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  useEffect(() => {
    // Get Inventory topic's subtopics directly from sidebarData
    const inventoryTopic = sidebarData.find(
      (topic) => topic.name === "Inventory"
    );
    if (inventoryTopic) {
      setSubtopics(inventoryTopic.subtopics);
    }
  }, []);

  const toggleCard = (id: number) => {
    if (expandedCard === id) {
      setExpandedCard(null);
    } else {
      setExpandedCard(id);
    }
  };

  const renderSubtopicContent = (subtopicName: string) => {
    switch (subtopicName) {
      case "Ceylon Electricity Board Material Details":
        return <MaterialMaster />;
      case "inventory items":
        return <div>Inventory Items Content</div>;
      case "inventory movement":
        return <div>Inventory Movement Content</div>;
      case "inventory reports":
        return <div>Inventory Reports Content</div>;
      case "inventory alerts":
        return <div>Inventory Alerts Content</div>;
      case "inventory history":
        return <div>Inventory History Content</div>;
      case "inventory categories":
        return <div>Inventory Categories Content</div>;
      default:
        return (
          <div className="text-red-500 text-xs">
            No content available for {subtopicName}
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col gap-4 pt-5">
      {subtopics.map((subtopic) => (
        <div key={subtopic.id} className="rounded-lg shadow-md w-11/12">
          {/* Card Header */}
          <div
            className="relative px-4 py-2.5 cursor-pointer flex items-center transition-all duration-200 bg-gradient-to-r from-[#800000]/5 via-[#800000]/3 to-transparent hover:from-[#800000]/8 hover:via-[#800000]/5 hover:to-transparent"
            onClick={() => toggleCard(subtopic.id)}
          >
            <div className="flex items-center w-full">
              <div className="flex-shrink-0 mr-3">
                <ChevronDownIcon
                  className={`h-5 w-5 text-[#800000] transition-transform duration-300 ${
                    expandedCard === subtopic.id ? "rotate-180" : ""
                  }`}
                />
              </div>
              <div className="text-sm text-[#800000] tracking-wide">
                {subtopic.name}
              </div>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#800000]/20 rounded-l-full" />
          </div>

          {/* Card Content */}
          <div
            className={`overflow-hidden transition-[max-height] duration-1000 ease-in-out bg-[#f8f9fa] ${
              expandedCard === subtopic.id ? "max-h-[1000px]" : "max-h-0"
            }`}
          >
            {expandedCard === subtopic.id && (
              <div className="p-4">{renderSubtopicContent(subtopic.name)}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Inventory;
