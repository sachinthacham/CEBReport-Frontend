import UserNavBar from "./components/layout/UserNavBar";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// const UserLayout = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <>
//       <UserNavBar />
//       <Navbar />
//       <div className="flex">
//         <Sidebar />
//         <main className="flex-1 p-4">{children}</main>
//       </div>
//     </>
//   );
// };

// export default UserLayout;
const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      {/* Fixed Top Bar: UserNavBar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <UserNavBar />
      </div>

      {/* Fixed Second Bar: Navbar */}
      <div className="fixed top-[48px] left-0 w-full z-40">
        {" "}
        {/* Adjust top value as per UserNavBar height */}
        <Navbar />
      </div>

      {/* Body layout */}
      <div className="pt-[112px] flex">
        {" "}
        {/* Adjust padding-top to height of UserNavBar + Navbar */}
        {/* Fixed Sidebar */}
        <div className="w-64 fixed left-0 top-[112px] z-30 bg-white shadow">
          <Sidebar />
        </div>
        {/* Scrollable Main Content */}
        <main className="ml-64 flex-1 p-4 overflow-y-auto h-[calc(100vh-112px)]">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default UserLayout;
