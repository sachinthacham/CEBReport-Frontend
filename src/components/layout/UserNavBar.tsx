// import { FaUser } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useUser } from "../../contexts/UserContext";

// const UserNavBar = () => {
//   const navigate = useNavigate();
//   const { user } = useUser();

//   const handleClick = () => {
//     navigate("/user");
//   };
//   return (
//     <div className="w-full py-2 flex justify-end bg-[#800000] px-5 gap-3">
//       <FaUser size={24} color="white" />
//       <div className="text-white text-md cursor-pointer" onClick={handleClick}>
//         {user.Name}
//       </div>
//     </div>
//   );
// };

// export default UserNavBar;
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { useState, useRef, useEffect } from "react";
import { useLogged } from "../../contexts/UserLoggedStateContext";

const UserNavBar = () => {
  const navigate = useNavigate();
  const { user } = useUser(); // make sure logout is defined in your context
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { logout } = useLogged();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    navigate("/user");
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  return (
    <div
      className="w-full py-2 flex justify-end bg-[#800000] px-5 gap-3 relative"
      ref={dropdownRef}
    >
      <FaUser size={24} color="white" />
      <div className="text-white text-sm cursor-pointer" onClick={handleToggle}>
        {user.Name}
      </div>

      {isOpen && (
        <div className="absolute right-5 top-12 bg-white shadow-lg rounded-md w-40 z-50">
          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm"
            onClick={handleProfileClick}
          >
            My Profile
          </button>
          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm text-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserNavBar;
