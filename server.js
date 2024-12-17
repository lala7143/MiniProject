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




