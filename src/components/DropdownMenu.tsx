import { useState } from "react";
const DropdownMenu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div className="relative  w-40">
      <div className=" px-6">
        <button onClick={handleClick}>Distribution</button>
      </div>

      {open && (
        <div className="absolute">
          <div>
            <button className="flex justify-center items-start  px-3">
              Distribution 1
            </button>
          </div>
          <div>
            <button className="flex justify-center items-start  px-3">
              Distribution 2
            </button>
          </div>
          <div>
            <button className="flex justify-center items-start  px-3">
              Distribution 3
            </button>
          </div>
          <div>
            <button className="flex justify-center items-start  px-3">
              Distribution 4
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
