import CEBlogo from "../../assets/CEB logo.png";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/report");
  };
  return (
    <nav className="h-16 bg-white shadow-md flex items-center justify-between px-4 sm:px-6 relative bg-fixed">
      <div className="flex items-center gap-4">
        <div className="w-16 sm:w-20 md:w-24">
          <img src={CEBlogo} alt="CEB Logo" className="w-full h-auto" />
        </div>
        <div className="text-lg sm:text-xl font-bold text-[#800000] hidden sm:block">
          CEB REPORTING
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div
          className="flex items-center gap-2 text-white bg-[#800000] hover:bg-[#a00000] px-3 py-1.5 sm:px-4 sm:py-2 rounded-md transition-colors cursor-pointer"
          onClick={handleNavigate}
        >
          <FaArrowLeft className="text-sm sm:text-base" />
          <span className="text-xs sm:text-sm">Back To Dashboard</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
