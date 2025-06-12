import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { data } from "../../data/SideBarData";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeId, setActiveId] = useState<number | null>(data[0]?.id || null);

  const handleClick = (id: number, path: string, subtopics: any[]) => {
    setActiveId(id);
    navigate(path, { state: { subtopics } });
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const matchedTopic = data.find((topic) => topic.path === currentPath);

    if (matchedTopic) {
      if (activeId !== matchedTopic.id) {
        setActiveId(matchedTopic.id);
      }
    } else {
      const first = data[0];
      setActiveId(first.id);
      navigate(first.path, { state: { subtopics: first.subtopics } });
    }
  }, [location.pathname]);

  return (
    <div className="w-full bg-white p-2 sm:p-4 text-[#800000] font-normal cursor-pointer overflow-y-auto h-full">
      {data.map((topic) => {
        const isActive = activeId === topic.id;

        return (
          <div key={topic.id} className="mb-2">
            <div
              className={`p-2 rounded shadow cursor-pointer flex items-center transition-colors duration-200 ${
                isActive
                  ? "bg-[#800000] text-white"
                  : "bg-white text-[#800000] hover:bg-gray-50"
              }`}
              onClick={() => handleClick(topic.id, topic.path, topic.subtopics)}
            >
              <div className="flex items-center text-sm w-full">
                <div className="px-2 flex-shrink-0">
                  <topic.icon className="w-5 h-5" />
                </div>
                <div className="truncate">{topic.name}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
