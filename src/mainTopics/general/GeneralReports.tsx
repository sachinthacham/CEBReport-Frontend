import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { data as sidebarData } from "../../data/SideBarData";

interface Subtopic {
  id: number;
  name: string;
}

const GeneralReports: React.FC = () => {
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
    // Here you would render different components based on the subtopic name
    return <div className="p-4">Content for {name}</div>;
  };

  return (
    <div className="flex flex-col gap-4 pt-5">
      {subtopics.map((subtopic) => (
        <div key={subtopic.id} className="rounded-lg shadow-md">
          <div
            className="p-4 cursor-pointer hover:bg-gray-100 bg-white"
            onClick={() => toggleCard(subtopic.id)}
          >
            <div className="flex items-center gap-2">
              <h3 className="text-sm">{subtopic.name}</h3>
            </div>
          </div>

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

export default GeneralReports;
