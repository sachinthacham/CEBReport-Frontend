import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { data } from "../../data/SideBarData";

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState<number | null>(null);

  const handleClick = (id: number, path: string, subtopics: any[]) => {
    setActiveId(id);
    navigate(path, { state: { subtopics } });
  };

  // Optional: Set activeId on page reload based on current path
  useEffect(() => {
    const currentPath = window.location.pathname;
    const matchedTopic = data.find((topic) => topic.path === currentPath);
    if (matchedTopic) {
      setActiveId(matchedTopic.id);
    }
  }, []);

  return (
    <div className="w-full bg-white p-4 text-[#800000] font-normal cursor-pointer">
      {data.map((topic) => {
        const isActive = activeId === topic.id;

        return (
          <div key={topic.id} className="mb-2">
            <div
              className={`p-2 rounded shadow cursor-pointer flex items-center ${
                isActive ? "bg-[#800000] text-white" : "bg-white text-[#800000]"
              }`}
              onClick={() => handleClick(topic.id, topic.path, topic.subtopics)}
            >
              <div className="flex items-center text-md">
                <div className="px-2">
                  <topic.icon />
                </div>
                <div>{topic.name}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
