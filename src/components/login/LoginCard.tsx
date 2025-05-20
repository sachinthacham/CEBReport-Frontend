import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../../contexts/UserContext";
import { useLogged } from "../../contexts/UserLoggedStateContext";
import { postJSON } from "../../helpers/LoginHelper";
import InputField from "../shared/InputField";
import ceb from "../../assets/CEB logo.png";

const LoginCard = () => {
  const { setLogged } = useLogged();
  const { setUser } = useUser();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();

  //   try {
  //     const IsLogged = await postJSON("/CBRSAPI/CBRSUPERUserLogin", {
  //       Username: username,
  //       Password: password,
  //     });
  //     setLogged(IsLogged);

  //     if (logged?.Logged) {
  //       toast.success("Login successful!", { autoClose: 2000 });
  //       navigate("/report");
  //       const userData = await postJSON("/CBRSAPI/CBRSEPFNOLogin", {
  //         Username: username,
  //         Password: password,
  //       });
  //       setUser(userData);
  //       if (user.Logged) {
  //         console.log("User details have been fetched successfully");
  //       } else {
  //         console.log("User details cant be fetched");
  //       }
  //     } else {
  //       toast.error("Invalid username or password");
  //     }
  //   } catch (error) {
  //     console.error("Error during login:", error);
  //     toast.error("Network or server error");
  //   }
  // };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const IsLogged = await postJSON("/CBRSAPI/CBRSUPERUserLogin", {
        Username: username,
        Password: password,
      });

      setLogged(IsLogged);

      if (IsLogged?.Logged) {
        toast.success("Login successful!", { autoClose: 2000 });
        navigate("/report");

        const userData = await postJSON("/CBRSAPI/CBRSEPFNOLogin", {
          Username: username,
          Password: password,
        });

        setUser(userData);

        if (userData?.Logged) {
          console.log("User details have been fetched successfully");
        } else {
          console.log("User details can't be fetched");
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
          <InputField
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

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
