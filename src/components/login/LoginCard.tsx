import { useState } from "react";
import ceb from "../assets/CEB logo.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../../contexts/UserContext";
import { useLogged } from "../../contexts/UserLoggedStateContext";
import { postJSON } from "../../helpers/LoginHelper";

const LoginCard = () => {
  const { setLogged, logged } = useLogged();
  const { setUser, user } = useUser();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const [showPopUp, setShowPopUp] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const IsLogged = await postJSON("/CBRSAPI/CBRSUPERUserLogin", {
        Username: username,
        Password: password,
      });
      setLogged(IsLogged);

      if (logged.Logged) {
        toast.success("Login successful!", { autoClose: 2000 });
        navigate("/report");
        const userData = await postJSON("/CBRSAPI/CBRSUPERUserLogin", {
          Username: username,
          Password: password,
        });
        setUser(userData);
        if (user.Logged) {
          console.log("User details have been fetched successfully");
        } else {
          console.log("User details cant be fetched");
        }
      } else {
        toast.error("Invalid username or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Network or server error");
    }
  };

  return (
    <div>
      <div className="bg-[#FFF066] shadow-lg rounded-lg p-6">
        <div className="flex justify-center mb-4">
          <img src={ceb} alt="CEB Logo" className="w-40 h-20" />
        </div>
        <div className="text-center text-sm text-gray-600 mb-6">
          Sign In With Credentials
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">UserName</label>
            <input
              value={username}
              className="w-full px-3 py-2 border rounded text-sm shadow focus:outline-none focus:ring"
              placeholder="UserName"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              value={password}
              type="password"
              className="w-full px-3 py-2 border rounded text-sm shadow focus:outline-none focus:ring"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              className="form-checkbox text-gray-700 w-4 h-4"
            />
            <span className="ml-2 text-sm text-gray-600">Remember Me</span>
          </div>

          <button
            type="submit"
            className="w-full bg-[#7c0000] text-white py-2 rounded shadow hover:shadow-lg transition-all duration-150"
          >
            Sign In
          </button>
        </form>

        <div className="flex justify-between mt-6 text-sm text-gray-500"></div>
      </div>
    </div>
  );
};

export default LoginCard;
