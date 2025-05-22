import { useNavigate } from "react-router-dom";
import { data } from "../../data/SideBarData";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };
  return (
    <div className="w-full bg-white min-h-screen p-4 text-[#800000] font-semibold cursor-pointer">
      {data.map((topic) => (
        <div key={topic.id} className="mb-2">
          <div className="bg-white p-3 rounded shadow cursor-pointer hover:bg-gray-200">
            <div className="flex justify-between items-center">
              <div className="flex justify-around items-center">
                <div className="px-2">
                  <topic.icon />
                </div>
                <div onClick={() => handleClick(topic.path)}>{topic.name}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Sidebar;
