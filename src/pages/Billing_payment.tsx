import { useState } from "react";
import { postJSON } from "../helpers/LoginHelper";
import BillingForm from "../components/Billing_Form";
import BillingChart from "../components/Biling_Chart";

type Customer = {
  customerMasDetail: any;
  customerReadDetail: ReadDetails[];
};
type ReadDetails = {
  billCycle: string;
  days: string;
  kwh: string;
  readDate: string;
  readMet1: string;
  readMet2: string;
  readMet3: string;
  units: string;
  year: string;
};

const BillingPage = () => {
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
    <div className="p-6 space-y-8">
      <BillingForm onSubmit={handleFormSubmit} />
      {customer && <BillingChart data={customer.customerReadDetail} />}
    </div>
  );
};
export default BillingPage;
