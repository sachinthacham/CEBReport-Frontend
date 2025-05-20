import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import UserNavBar from "../components/UserNavBar";
import Billing_payment from "../pages/Billing_payment";

const Billing_payment_layout = () => {
  return (
    <div className="min-h-screen">
      <UserNavBar />
      <Navbar />
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="w-4/5 p-4">
          <Billing_payment />
        </div>
      </div>
    </div>
  );
};

export default Billing_payment_layout;
