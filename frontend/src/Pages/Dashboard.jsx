import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);

  const handleLogout = () => {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      navigate("/login");
    }, 1500);
  };

  const handleContinue = () => {
    navigate("/continue");
  };

  useEffect(() => {
    setShowLoader(true);
    setTimeout(() => setShowLoader(false), 1000);
  }, []);

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      {showLoader ? (
        <div className="flex flex-col items-center space-y-4">
          <div className="loader w-16 h-16 border-4 border-t-4 border-blue-300 rounded-full animate-spin"></div>
          <p className="text-white text-lg font-semibold">Processing...</p>
        </div>
      ) : (
        <div className="text-center text-white p-8 bg-gray-700 bg-opacity-90 rounded-lg shadow-xl w-full max-w-lg">
          <div className="flex justify-center mb-6">
            <img
              src="https://scontent.flko13-1.fna.fbcdn.net/v/t39.30808-1/301540428_484987416967441_5204203160874743305_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=f4b9fd&_nc_ohc=9FqLM9ueo_4Q7kNvgEa6ruD&_nc_zt=24&_nc_ht=scontent.flko13-1.fna&_nc_gid=Aya0Tj0ATwUoKnxVMhVlogf&oh=00_AYACd8f8Go0KXk0igU5eKlvQQSnmV6V5NotzcZwCSsLipw&oe=67663984"
              alt="Profile Picture"
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
          <h1 className="text-5xl font-bold mb-6 animate-slideInUp">Welcome BBD ITM </h1>
          <p className="text-lg mb-6">Welcome! Your email has been successfully verified.</p>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-800 via-pink-400 to-red-500 p-6 rounded-lg shadow-inner">
              <p className="text-xl font-medium">Your Current Status</p>
              <ul className="text-left list-disc mt-4 ml-6 space-y-2">
                <li>You’ve logged in successfully.</li>
                <li>Email verified at {new Date().toLocaleTimeString()}.</li>
                <li>Your account is fully active.</li>
              </ul>
            </div>
            <div className="flex justify-between gap-4">
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-red-600 text-lg font-semibold rounded-lg hover:bg-red-700 transition duration-300 ease-in-out"
              >
                Logout
              </button>
              <button
                onClick={handleContinue}
                className="px-6 py-3 bg-green-600 text-lg font-semibold rounded-lg hover:bg-green-700 transition duration-300 ease-in-out"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;