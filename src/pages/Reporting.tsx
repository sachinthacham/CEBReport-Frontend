// import Navbar from "../components/layout/Navbar";
// import Sidebar from "../components/layout/Sidebar";
// import UserNavBar from "../components/layout/UserNavBar";

// const Reporting = () => {
//   return (
//     <div className="min-h-screen">
//       <UserNavBar />
//       <Navbar />
//       <div className="flex">
//         {/* Sidebar */}
//         <div className="w-1/5">
//           <Sidebar />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Reporting;

import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import UserNavBar from "../components/layout/UserNavBar";
import { data } from "../data/SideBarData";
import BillingForm from "../components/billing/Billing_Form";
import { Customer } from "../data/DataTypes";
import { postJSON } from "../helpers/LoginHelper";
import BillingChart from "../components/billing/Biling_Chart";

const Reporting = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleCard = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const [customer, setCustomer] = useState<Customer | null>(null);

  const handleFormSubmit = async (details: {
    acctNo: string;
    FbillCycle: number;
    TbillCycle: number;
  }) => {
    const data = await postJSON(
      "/CEBINFO_API_2025/api/OrdinaryReadingHistory",
      details
    );
    setCustomer(data);
  };

  return (
    <div className="min-h-screen">
      <UserNavBar />
      <Navbar />
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/5">
          <Sidebar />
        </div>
        {/* Main Content */}
        <div className="w-4/5 p-4">
          <div className="grid grid-cols-1 gap-4">
            {data.map((card) => (
              <div
                key={card.id}
                className="border rounded-lg p-4 shadow-md cursor-pointer"
                onClick={() => toggleCard(card.id)}
              >
                <h3 className="text-lg font-bold">{card.name}</h3>
                {expandedCard === card.id && (
                  <div className="mt-4">
                    {/* Billing Form */}
                    <div className="mb-4">
                      <h4 className="text-md font-semibold">Billing Form</h4>
                      <BillingForm onSubmit={handleFormSubmit} />
                    </div>
                    {/* Billing Chart */}
                    <div>
                      <h4 className="text-md font-semibold">Billing Chart</h4>
                      {customer && (
                        <BillingChart data={customer.customerReadDetail} />
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reporting;
