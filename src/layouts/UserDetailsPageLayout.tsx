import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import UserNavBar from "../components/layout/UserNavBar";
import UserDetails from "../pages/UserDetails";

const UserDetailsPageLayout = () => {
  return (
    <main>
      <section>
        <UserNavBar />
        <Navbar />
      </section>
      <section className="flex">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <UserDetails />
      </section>
    </main>
  );
};

export default UserDetailsPageLayout;
