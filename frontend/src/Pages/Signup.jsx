import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      const response = await axios.post("http://localhost:5000/send-otp", { email });
      alert(response.data.message);
      setIsOtpSent(true);
    } catch (error) {
      alert(error.response?.data?.message || "Error sending OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      await axios.post("http://localhost:5000/verify-otp", { email, otp });
      alert("Email Verified Successfully");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Error verifying OTP");
    }
  };

  return (
    <div className="h-screen bg-gradient-to-r from-purple-500 to-indigo-500 flex justify-center items-center flex-col">
      <div className="w-full p-4 from-purple-500 to-indigo-500 shadow-md mb-4">
        <img
          src="https://scontent.flko13-1.fna.fbcdn.net/v/t39.30808-1/301540428_484987416967441_5204203160874743305_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=f4b9fd&_nc_ohc=9FqLM9ueo_4Q7kNvgEa6ruD&_nc_zt=24&_nc_ht=scontent.flko13-1.fna&_nc_gid=Aya0Tj0ATwUoKnxVMhVlogf&oh=00_AYACd8f8Go0KXk0igU5eKlvQQSnmV6V5NotzcZwCSsLipw&oe=67663984"
          alt="Logo"
          className="w-24 h-24 object-cover rounded-full mx-auto"
        />
        <h1 className="text-2xl font-bold text-white-700 text-center mt-2">
        Babu Banarasi Das Institute of Technology and Management Lucknow
        </h1>
      </div>
      <div className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-700 text-center">Welcome Back</h1>
        <p className="text-sm text-gray-500 text-center">Enter your email to continue.</p>
        <div className="mt-6">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            disabled={isOtpSent}
          />
          {isOtpSent && (
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          )}
          <button
            type="button"
            onClick={isOtpSent ? verifyOtp : sendOtp}
            className="w-full px-4 py-3 font-semibold text-white bg-indigo-500 rounded hover:bg-indigo-600 transition duration-300 ease-in-out mt-4"
          >
            {isOtpSent ? "Verify OTP" : "Send OTP"}
          </button>
          <p className="text-sm text-gray-500 text-center mt-4">
            Don't have an account? <a href="#" className="text-indigo-500 hover:text-indigo-600">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;