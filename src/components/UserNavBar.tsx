import { FaUser } from "react-icons/fa";

const UserNavBar = () => {
  return (
    <div className="w-full py-2 flex justify-end bg-[#800000] px-5 gap-3">
      <FaUser size={24} color="white" />
      <div className="text-white text-md">Sachintha Chamindu</div>
    </div>
  );
};

export default UserNavBar;
