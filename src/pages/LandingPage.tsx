import UserNavBar from "../components/layout/UserNavBar";
//import LandingPageSideBar from "../components/LandingPageSideBar";
import LandingPageCards from "../components/landing/LandingPageCards";
import NavbarLanding from "../components/landing/NavbarLanding";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <UserNavBar />
      <NavbarLanding />
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
