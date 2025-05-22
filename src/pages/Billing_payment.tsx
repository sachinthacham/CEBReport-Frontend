// import { useState } from "react";
// import { postJSON } from "../helpers/LoginHelper";
// import BillingForm from "../components/billing/Billing_Form";
// import BillingChart from "../components/billing/Biling_Chart";
// import { Customer } from "../data/DataTypes";

// const BillingPage = () => {

//   return (
//     <div className="p-6 space-y-8">
//       <BillingForm onSubmit={handleFormSubmit} />
//       {customer && <BillingChart data={customer.customerReadDetail} />}
//     </div>
//   );
// };
// export default BillingPage;
import { useState } from "react";
import { postJSON } from "../helpers/LoginHelper";
import BillingForm from "../components/billing/Billing_Form";
import BillingChart from "../components/billing/Biling_Chart";
import { Customer } from "../data/DataTypes";

const BillingPage = () => {
  return <div className="p-6 space-y-8"></div>;
};
export default BillingPage;
