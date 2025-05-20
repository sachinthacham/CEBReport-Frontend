import CEBlogo from "../assets/CEB logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <nav className="h-16 bg-white shadow-md flex items-center justify-between px-2 relative">
      <div className="flex justify-between items-center">
        {" "}
        <div>
          <img src={CEBlogo} alt="" width={100} height={100} />
        </div>
        <div className="text-xl font-bold text-[#800000]">CEB Reporting</div>
      </div>
      <div className="">
        <div className="w-full  rounded-2xl text-white bg-[#800000] cursor-pointer flex justify-between px-3 py-2 gap-4 items-center shadow-lg">
          <div onClick={handleNavigate}>Log out</div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
