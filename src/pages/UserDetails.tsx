import { useUser } from "../contexts/UserContext";
import Detail from "../components/UserDetailListItem";

const UserDetails = () => {
  const { user } = useUser();
  console.log(user);
  return (
    <div className="w-4/5">
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-tr from-[#f9fafb] to-[#e5e7eb] px-4">
        <div className="backdrop-blur-md  border border-gray-200 shadow-2xl rounded-3xl max-w-4xl w-full p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10 tracking-tight">
            👤 User Profile
          </h2>
          <div className="flex justify-between items-center px-30">
            <div className="grid grid-cols-1 gap-6 w-full">
              <Detail label="User No" value={user.Userno} />
              <Detail label="Name" value={user.Name} />
              <Detail label="Designation" value={user.Designation} />
              <Detail label="Telephone No" value={user.TelephoneNo} />
              <Detail label="NIC No" value={user.NIC_no} />
              <Detail label="Salary Scale" value={user.salary_scale} />
              <Detail label="Private Address" value={user.Private_Addr} />
              <Detail label="Email" value={user.Email} />
              <Detail label="VIP Status" value={user.Vip} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
