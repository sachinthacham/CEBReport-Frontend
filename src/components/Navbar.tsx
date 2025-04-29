// import { useState } from "react";
// import CEBlogo from "../assets/CEB logo.png";

// const Navbar = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const handleDropdownToggle = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   return (
//     <nav className="h-16 bg-white shadow-md flex items-center justify-between px-6 relative">
//       <div className="flex justify-between items-center">
//         {" "}
//         <div>
//           <img src={CEBlogo} alt="" width={100} height={100} />
//         </div>
//         <div className="text-xl font-bold text-[#800000]">CEB Reporting</div>
//       </div>

//       <div className="flex items-center gap-2">
//         {/* Distribution with Dropdown */}
//         <div className="relative">
//           <button
//             onClick={handleDropdownToggle}
//             className="text-gray-600 hover:text-blue-600 px-6"
//           >
//             Distribution
//           </button>

//           {/* Dropdown Content */}
//           {isDropdownOpen && (
//             <div className="absolute top-full mt-2 bg-white shadow-md rounded-md w-48 z-50">
//               <ul className="flex flex-col">
//                 <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//                   Distribution 1
//                 </li>
//                 <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//                   Distribution 2
//                 </li>
//                 <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//                   Distribution 3
//                 </li>
//                 <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//                   Distribution 4
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>

//         {/* Other Buttons */}
//         <button className="text-gray-600 hover:text-blue-600 px-6">
//           Transmission
//         </button>
//         <button className="text-gray-600 hover:text-blue-600 px-6">
//           Finance
//         </button>
//         <button className="text-gray-600 hover:text-blue-600 px-6">
//           CS Division
//         </button>
//         <button className="text-gray-600 hover:text-blue-600 px-6">
//           Generation
//         </button>
//         <button className="text-gray-600 hover:text-blue-600 px-6">
//           Projects
//         </button>
//         <button className="text-gray-600 hover:text-blue-600 px-6">
//           Assets Management
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import CEBlogo from "../assets/CEB logo.png";
import { FaArrowLeft } from "react-icons/fa";

const Navbar = () => {
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
        <div className="w-full bg-white  rounded-2xl text-[#800000] cursor-pointer flex justify-between p-3 gap-4 items-center shadow-lg">
          <div>
            <FaArrowLeft />
          </div>
          <div> Back To Dashboard</div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
