import Navbar from "../components/Navbar";
import UserNavBar from "../components/UserNavBar";
//import LandingPageSideBar from "../components/LandingPageSideBar";
import LandingPageCards from "../components/LandingPageCards";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <UserNavBar />
      <Navbar />
      <div className="flex">
        {/* Sidebar */}
        {/* <div className="w-1/7">
          <LandingPageSideBar />
        </div> */}

        {/* Main Content */}
        <div className="flex-1 p-4">
          <LandingPageCards />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
