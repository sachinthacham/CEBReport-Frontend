import { useState } from "react";
import { Customer } from "../data/DataTypes";
import { postJSON } from "../helpers/LoginHelper";
import { useLocation } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import BillingForm from "../components/billing/Billing_Form";
import BillingChart from "../components/billing/Biling_Chart";

type Subtopic = {
  id: number;
  name: string;
};

const Reporting = () => {
  const location = useLocation();
  const subtopics: Subtopic[] = location.state?.subtopics || [];
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [visibleCard, setVisibleCard] = useState<number | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);

  const toggleCard = (id: number) => {
    if (expandedCard === id) {
      // Collapse the card
      setExpandedCard(null);
      setTimeout(() => setVisibleCard(null), 1000); // Delay content removal to match animation duration
    } else {
      // Expand the card
      setVisibleCard(id);
      setTimeout(() => setExpandedCard(id), 200); // Ensure smooth expansion
    }
  };

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
    <div className="min-h-screen bg-[#f8f9fa]">
      <div className="flex">
        {/* Main Content */}
        <div className="w-full p-4 bg-[#f8f9fa]">
          <div className="grid grid-cols-1 gap-4 w-full">
            {subtopics.map((subtopic) => (
              <div key={subtopic.id} className="rounded-lg shadow-md">
                {/* Card Header */}
                <div
                  className="p-4 cursor-pointer hover:bg-gray-100 bg-white"
                  onClick={() => toggleCard(subtopic.id)}
                >
                  <div className="flex items-center gap-2">
                    <ChevronDownIcon
                      className={`h-5 w-5 text-gray-600 transition-transform duration-300 ${
                        expandedCard === subtopic.id ? "rotate-180" : ""
                      }`}
                    />
                    <h3 className="text-md">{subtopic.name}</h3>
                  </div>
                </div>
                {/* Expandable Content */}
                <div
                  className={`overflow-hidden transition-[max-height] duration-1000 ease-in-out bg-white ${
                    expandedCard === subtopic.id ? "max-h-[1000px]" : "max-h-0"
                  }`}
                >
                  {visibleCard === subtopic.id && (
                    <div className="p-4 gap-10 w-full ">
                      {/* Billing Form */}
                      <div className="w-full flex flex-col gap-2 text-sm">
                        <BillingForm onSubmit={handleFormSubmit} />
                      </div>
                      {/* Billing Chart */}
                      <div className="w-full">
                        {customer && (
                          <BillingChart data={customer.customerReadDetail} />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reporting;
