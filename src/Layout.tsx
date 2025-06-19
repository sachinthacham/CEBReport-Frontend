import UserNavBar from "./components/layout/UserNavBar";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Top Bar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <UserNavBar />
      </div>

      {/* Fixed Navbar below Top Bar */}
      <div className="fixed top-12 left-0 w-full z-40">
        <Navbar />
      </div>

      {/* Mobile Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-[88px] left-4 z-40 bg-[#800000] text-white p-2 rounded-md shadow-lg hover:bg-[#a00000] transition-colors duration-200"
      >
        <FaBars className="w-5 h-5" />
      </button>

      {/* Sidebar - Hidden on mobile by default */}
      <div
        className={`fixed top-[88px] left-0 h-[calc(100vh-88px)] z-30 bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-64 overflow-y-auto`}
      >
        <div className="h-full flex flex-col">
          <Sidebar />
        </div>
      </div>

      {/* Main content area with responsive margin */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
        }`}
      >
        <main className="pt-[120px] px-4 pb-4">
          <div className="max-w-7xl mx-auto relative z-20 ml-[350px]">
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      <div className="w-full z-40 bg-white border-t border-gray-200">
        <Footer />
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default UserLayout;
