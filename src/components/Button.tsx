type ButtonProps = {
  children: string;
  onClick?: () => void;
};

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      className="w-full h-10 bg-[#e9ecef] hover:bg-[#0a9396] text-[#0a9396] hover:text-white font-medium rounded-md shadow-md transition duration-200 ease-in-out px-4 text-sm"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
