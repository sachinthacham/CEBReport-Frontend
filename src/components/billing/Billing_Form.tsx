import { useState, FormEvent } from "react";

type Props = {
  onSubmit: (details: {
    acctNo: string;
    FbillCycle: number;
    TbillCycle: number;
  }) => void;
};

const BillingForm = ({ onSubmit }: Props) => {
  const [acctNo, setAcctNo] = useState("");
  const [FbillCycle, setFbillCycle] = useState("");
  const [TbillCycle, setTbillCycle] = useState("");

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      acctNo,
      FbillCycle: parseInt(FbillCycle),
      TbillCycle: parseInt(TbillCycle),
    });
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="p-4 bg-white rounded shadow-md w-full flex flex-col gap-4"
    >
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium">Account Number</label>
          <input
            type="text"
            value={acctNo}
            onChange={(e) => setAcctNo(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">From Bill Cycle</label>
          <input
            type="number"
            value={FbillCycle}
            onChange={(e) => setFbillCycle(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">To Bill Cycle</label>
          <input
            type="number"
            value={TbillCycle}
            onChange={(e) => setTbillCycle(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded self-start"
      >
        Submit
      </button>
    </form>
  );
};

export default BillingForm;
