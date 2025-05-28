import UserNavBar from "./components/layout/UserNavBar";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      {/* Fixed Top Bar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <UserNavBar />
      </div>

      {/* Fixed Navbar below Top Bar */}
      <div className="fixed top-[48px] left-0 w-full z-40">
        <Navbar />
      </div>

      {/* Fixed Sidebar */}
      <div className="w-64 fixed left-0 top-[112px] h-3/5 z-30  shadow bg-red-500">
        <Sidebar />
      </div>

      {/* Main content area with margin to avoid sidebar */}
      <main className="ml-64 pt-[112px] p-4 min-h-[calc(100vh-112px)] overflow-y-auto">
        {children}
      </main>

      {/* Footer with same left margin to avoid overlap */}

      <div className="bottom-0 left-0 w-full z-50">
        <Footer />
      </div>
    </div>
  );
};
export default UserLayout;
