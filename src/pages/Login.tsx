import ceb from "../assets/CEB logo.png";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white ">
      <div className="w-full max-w-md px-4 ">
        <div className="bg-[#e0e1dd] shadow-lg rounded-lg p-6">
          <div className="flex justify-center mb-4">
            <img src={ceb} alt="CEB Logo" className="w-70 h-40" />
          </div>
          <div className="text-center text-sm text-gray-600 mb-6">
            Sign In With Credentials
          </div>
          <form>
            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded text-sm shadow focus:outline-none focus:ring"
                placeholder="Email"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded text-sm shadow focus:outline-none focus:ring"
                placeholder="Password"
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
              type="button"
              className="w-full bg-[#7c0000] text-white py-2 rounded shadow hover:shadow-lg transition-all duration-150"
            >
              Sign In
            </button>
          </form>

          <div className="flex justify-between mt-6 text-sm text-gray-500"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
