import { FiSettings } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  const topics = [
    {
      id: 1,
      title: "Profile",
      icon: <FaUser />,
    },
    {
      id: 2,
      title: "Settings",
      icon: <FiSettings />,
    },
    {
      id: 3,
      title: "Logout",
      icon: <FiLogOut />,
    },
  ];

  return (
    <div className="w-full bg-gray-100 min-h-4/4 p-4">
      {topics.map((topic) => (
        <div key={topic.id} className="mb-2">
          <div className="bg-white p-3 rounded shadow cursor-pointer hover:bg-gray-200">
            <div className="flex justify-between items-center">
              <div className="flex justify-around items-center">
                <div className="px-2">{topic.icon}</div>
                <div>{topic.title}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
