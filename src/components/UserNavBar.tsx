import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const UserNavBar = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleClick = () => {
    navigate("/user");
  };
  return (
    <div className="w-full py-2 flex justify-end bg-[#800000] px-5 gap-3">
      <FaUser size={24} color="white" />
      <div className="text-white text-md cursor-pointer" onClick={handleClick}>
        {user.Name}
      </div>
    </div>
  );
};

export default UserNavBar;
