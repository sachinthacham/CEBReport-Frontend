import BulkReporting from "../mainTopics/billing&payments/customerDetails/BulkReporting";

type Props = {
  title: string;
  message?: string;
  onClose: () => void;
};

const Popup3 = ({ onClose }: Props) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-4/5 max-h-[90vh] overflow-y-auto">
        <BulkReporting />
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};
export default Popup3;
