setup new project in vscode
npm create vite@latest frontend choose React then choose Javascript

cd frontend

npm install

npm install react-router-dom axios

npm install -D tailwindcss postcss autoprefixer

npx tailwindcss init -p

paste this in tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};

paste this in src/index.css

@tailwind base;
@tailwind components;
@tailwind utilities;
paste this in Dashboard.jsx

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

create Signup.jsx in Dashboard/Pages
paste this in Signup.jsx
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

create Login.jsx in Pages
paste this in login.jsx

import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login Data:", { email, password });
    alert("Login successful!");
    window.location.href = "/dashboard"; // Redirect after login
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Left Section with Image */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 relative overflow-hidden">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/login-page-1886583-1598255.png" // Replace with an appropriate image
          alt="Login Background"
          className="absolute w-full h-full object-cover"
        />
        <div className="relative z-10 text-white p-8">
          <p className="text-sm uppercase tracking-widest mb-2">A wise quote</p>
          <h1 className="text-5xl font-bold leading-tight mb-4">Welcome Back</h1>
          <p className="text-lg">
            Log in to access your personalized dashboard and explore more features.
          </p>
        </div>
      </div>

      {/* Right Section with Form */}
      <div className="flex items-center justify-center w-full md:w-1/2 bg-white p-8">
        <div className="w-full max-w-md space-y-6 animate-slideUp">
          <h2 className="text-3xl font-bold text-gray-800 text-center">Log In</h2>
          <p className="text-sm text-gray-500 text-center">
            Enter your credentials to access your account.
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button
              type="submit"
              className="w-full px-4 py-3 font-semibold text-white bg-indigo-500 rounded hover:bg-indigo-600 transition duration-300 ease-in-out"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

paste this in App.jsx
// import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Continue from './Pages/Continue';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/continue" element={<Continue />} />
      </Routes>
    </Router>
  );
};

export default App;

Create Continue.jsx in Pages
Paste this in Continue.jsx

import React, { useState } from "react";
import axios from "axios";

const MentorMenteeForm = () => {
  const [formData, setFormData] = useState({
    rollNo: "",
    name: "",
    correspondenceAddress: "",
    permanentAddress: "",
    studentMobile: "",
    parentMobile: "",
    studentEmail: "",  // Only one student email field now
    occupation: "",
    localGuardian: "",
    parentName: "",
    parentAddress: "",
    academicQualifications: [
      {
        class: "10th",
        board: "",
        percentage: "",
        pcm: "",
        division: ""
      },
      {
        class: "12th",
        board: "",
        percentage: "",
        pcm: "",
        division: ""
      },
      {
        class: "Other",
        board: "",
        percentage: "",
        pcm: "",
        division: ""
      }
    ],
    extracurricularActivities: ["", "", ""],
    category: "GEN",
    achievement: "",
    class: "",  // New field for class
    branch: ""  // New field for branch
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleAcademicChange = (e, index) => {
    const { name, value } = e.target;
    const updatedAcademicQualifications = [...formData.academicQualifications];
    updatedAcademicQualifications[index][name] = value;
    setFormData((prevData) => ({
      ...prevData,
      academicQualifications: updatedAcademicQualifications
    }));
  };

  const handleExtracurricularChange = (e, index) => {
    const updatedActivities = [...formData.extracurricularActivities];
    updatedActivities[index] = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      extracurricularActivities: updatedActivities
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/mentor-mentee", formData);
      alert("Form submitted successfully!");
    } catch (error) {
      alert("Error submitting form.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <header className="text-center bg-blue-600 text-white py-5">
        <h1 className="text-3xl font-bold">
          Babu Banarasi Das Institute of Technology and Management
        </h1>
        <h3 className="text-lg mt-2">
          (Formerly known as Babu Banarasi Das National Institute of Technology
          and Management)
        </h3>
      </header>
      <section className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6 mt-10">
        <h2 className="text-2xl font-bold text-center mb-6">
          Mentor-Mentee Form
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Basic Info */}
          <div className="form-group">
            <label htmlFor="roll-no" className="block font-medium">
              University Roll No.
            </label>
            <input
              type="text"
              id="roll-no"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="form-group">
            <label htmlFor="name" className="block font-medium">
              Student Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Class and Branch */}
          <div className="form-group">
            <label htmlFor="class" className="block font-medium">
              Class
            </label>
            <input
              type="text"
              id="class"
              name="class"
              value={formData.class}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="form-group">
            <label htmlFor="branch" className="block font-medium">
              Branch
            </label>
            <input
              type="text"
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Correspondence and Permanent Address */}
          <div className="form-group">
            <label htmlFor="correspondence-address" className="block font-medium">
              Correspondence Address
            </label>
            <textarea
              id="correspondence-address"
              name="correspondenceAddress"
              value={formData.correspondenceAddress}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="form-group">
            <label htmlFor="permanent-address" className="block font-medium">
              Permanent Address
            </label>
            <textarea
              id="permanent-address"
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Parent Details */}
          <div className="form-group">
            <label htmlFor="parent-name" className="block font-medium">
              Parent Name
            </label>
            <input
              type="text"
              id="parent-name"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="form-group">
            <label htmlFor="parent-mobile" className="block font-medium">
              Parent Mobile Number
            </label>
            <input
              type="text"
              id="parent-mobile"
              name="parentMobile"
              value={formData.parentMobile}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Student Email (Only One Email Field Now) */}
          <div className="form-group">
            <label htmlFor="student-email" className="block font-medium">
              Student Email
            </label>
            <input
              type="email"
              id="student-email"
              name="studentEmail"
              value={formData.studentEmail}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Local Guardian */}
          <div className="form-group">
            <label htmlFor="local-guardian" className="block font-medium">
              Local Guardian Name
            </label>
            <input
              type="text"
              id="local-guardian"
              name="localGuardian"
              value={formData.localGuardian}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Academic Qualifications */}
          <fieldset className="border border-gray-300 p-4 rounded-md">
            <legend className="text-lg font-bold">Academic Qualifications</legend>
            <table className="table-auto w-full text-left border-collapse mt-4">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Class</th>
                  <th className="border border-gray-300 p-2">Board/University</th>
                  <th className="border border-gray-300 p-2">Percentage (Aggr.)</th>
                  <th className="border border-gray-300 p-2">Percentage (PCM/PCB/Science)</th>
                  <th className="border border-gray-300 p-2">Division</th>
                </tr>
              </thead>
              <tbody>
                {formData.academicQualifications.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">{item.class}</td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="text"
                        name="board"
                        value={item.board}
                        onChange={(e) => handleAcademicChange(e, index)}
                        className="w-full p-2"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        name="percentage"
                        value={item.percentage}
                        onChange={(e) => handleAcademicChange(e, index)}
                        className="w-full p-2"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        name="pcm"
                        value={item.pcm}
                        onChange={(e) => handleAcademicChange(e, index)}
                        className="w-full p-2"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="text"
                        name="division"
                        value={item.division}
                        onChange={(e) => handleAcademicChange(e, index)}
                        className="w-full p-2"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </fieldset>

          {/* Extra-curricular Activities */}
          <div className="form-group">
            <label className="block font-medium">
              Participation in Extra Curricular Activities (during course):
            </label>
            <ol className="list-decimal list-inside space-y-2">
              {formData.extracurricularActivities.map((activity, index) => (
                <li key={index}>
                  <input
                    type="text"
                    value={activity}
                    onChange={(e) => handleExtracurricularChange(e, index)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </li>
              ))}
            </ol>
          </div>

          {/* Achievement */}
          <div className="form-group">
            <label htmlFor="achievement" className="block font-medium">
              Achievement
            </label>
            <textarea
              id="achievement"
              name="achievement"
              value={formData.achievement}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-medium"
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default MentorMenteeForm;
frontend completed

Open new terminal
mkdir backend

cd backend

npm init -y

npm install express cors body-parser nodemailer mongoose bcrypt jsonwebtoken dotenv nodemon

create a file named server.js in backend folder
paste this in server.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

// Import MentorMentee model
const MentorMentee = require("./models/MentorMentee"); // Ensure this model exists

// Initialize app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS to allow React to communicate with Express

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/mentor-mentee")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL, // Your email
    pass: process.env.PASSWORD, // Your email password
  },
});

// OTP Storage (use a database for production)
const otpStore = {};

// Routes
// Submit Mentor-Mentee form
app.post("/api/mentor-mentee", async (req, res) => {
  try {
    const formData = new MentorMentee(req.body);
    const savedData = await formData.save();
    res.status(201).json({ message: "Form submitted successfully", data: savedData });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Retrieve Mentor-Mentee data
app.get("/api/mentor-mentee", async (req, res) => {
  try {
    const data = await MentorMentee.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Send OTP
app.post("/send-otp", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
  otpStore[email] = otp;

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Your OTP for Signup",
    text: `Your OTP is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return res.status(500).json({ message: "Error sending OTP" });
    }
    res.status(200).json({ message: "OTP sent successfully" });
  });
});

// Verify OTP
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  if (otpStore[email] && otpStore[email] === parseInt(otp)) {
    delete otpStore[email];
    return res.status(200).json({ success: true, message: "OTP verified" });
  }

  res.status(400).json({ message: "Invalid OTP" });
});

// Signup
app.post("/signup", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  if (users[email]) {
    return res.status(400).json({ message: "Email is already registered" });
  }

  users[email] = { email };
  res.status(201).json({ message: "Signup successful" });
});

// Example of any other routes you may have had
app.get("/", (req, res) => {
  res.send("Hello, this is your server!");
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

create a folder model and make a file mentormentee.js

const mongoose = require("mongoose");

const academicQualificationSchema = new mongoose.Schema({
  class: { type: String, required: true },
  board: { type: String, required: true },
  percentage: { type: String, required: true },
  pcm: { type: String, required: true }, // PCM/PCB/Science
  division: { type: String, required: true }
}, { _id: false });

const mentorMenteeSchema = new mongoose.Schema({
  rollNo: { type: String, required: true },
  name: { type: String, required: true },
  correspondenceAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  studentMobile: { type: String, required: true },
  parentMobile: { type: String, required: true },
  studentEmail: { type: String, required: true },
  occupation: { type: String, required: true },
  localGuardian: { type: String, required: false }, // Optional field
  parentName: { type: String, required: true },
  parentAddress: { type: String, required: true },
  class: { type: String, required: true },
  branch: { type: String, required: true },
  academicQualifications: [academicQualificationSchema],
  extracurricularActivities: { 
    type: [String], 
    default: ["", "", ""]
  },
  category: { 
    type: String, 
    enum: ["GEN", "OBC", "SC", "ST", "Other"], 
    default: "GEN" 
  },
  achievement: { type: String, required: false } // Optional field
}, { timestamps: true });

const MentorMentee = mongoose.model("MentorMentee", mentorMenteeSchema);

module.exports = MentorMentee;

create a file named .env
paste EMAIL and PASSWORD
you will learn how to get email and password in next section

nodemon server.js

Now, copy the text, this is your password
paste this in .env file as EMAIL and PASSWORD
it should look like this -

EMAIL = <your email here>
PASSWORD = <your password here>


made by srivastava
