import BillingForm from "../../components/mainTopics/billing&payments/customerDetails/Billing_Form";
import BillingChart from "../../components/mainTopics/billing&payments/customerDetails/Biling_Chart";
import BillingChart2 from "../../components/mainTopics/billing&payments/customerDetails/Billing_Chart2";
import BillingChart3 from "../../components/mainTopics/billing&payments/customerDetails/Billing_Chart3";
import { Customer, OrdinaryCusTransaction } from "../../data/DataTypes";
import { useState } from "react";
import { postJSON } from "../../helpers/LoginHelper";

const CustomerDetails = () => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [ord_cust_data, setOrd_cust_data] =
    useState<OrdinaryCusTransaction | null>(null);

  const handleFormSubmit = async (details: {
    acctNo: string;
    FbillCycle: number;
    TbillCycle: number;
  }) => {
    const data = await postJSON(
      "/CEBINFO_API_2025/api/OrdinaryReadingHistory",
      details
    );
    const OrdinaryCustomerTransactionData = await postJSON(
      "/CEBINFO_API_2025/api/OrdinaryCusTransaction",
      details
    );
    setCustomer(data);
    setOrd_cust_data(OrdinaryCustomerTransactionData);
  };

  return (
    <div className="p-4 gap-10 w-full">
      <div className="w-full flex flex-col gap-2 text-sm">
        <BillingForm onSubmit={handleFormSubmit} />
      </div>
      <div className="w-full">
        {customer && ord_cust_data && (
          <div className="flex">
            <BillingChart data={customer.customerReadDetail} />
            <BillingChart2 data={ord_cust_data.customerTransDetail} />
            <BillingChart3 data={ord_cust_data.customerTransDetail} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDetails;
