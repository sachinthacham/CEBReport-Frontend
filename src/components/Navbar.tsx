import CEBlogo from "../assets/CEB logo.png";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <nav className="h-16 bg-white shadow-md flex items-center justify-between px-2 relative bg-fixed">
      <div className="flex justify-between items-center">
        {" "}
        <div>
          <img src={CEBlogo} alt="" width={100} height={100} />
        </div>
        <div className="text-xl font-bold text-[#800000]">CEB Reporting</div>
      </div>
      <div className="">
        <div className="flex items-center gap-2 text-white bg-[#800000] hover:bg-[#a00000] px-4 py-2 rounded-md transition-colors cursor-pointer">
          <div>
            <FaArrowLeft />
          </div>
          <div onClick={handleNavigate}> Back To Dashboard</div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
