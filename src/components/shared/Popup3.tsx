import BulkReporting from "../mainTopics/billing&payments/customerDetails/BulkReporting";

const Popup3 = () => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-4/5 max-h-[90vh] overflow-y-auto">
        <BulkReporting />
      </div>
    </div>
  );
};

export default Popup3;
