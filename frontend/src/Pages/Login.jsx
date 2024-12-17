import React, { useState } from "react";

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
    <div className="login-container">
      <div className="login-left">
        {yourLogo && <img src={yourLogo} alt="Your Brand Logo" />}
        <h2>A wise quote</h2>
        <h1>Welcome Back</h1>
        <p>
          Log in to access your personalized dashboard and explore more features.
        </p>
      </div>
      <div className="login-right">
        <h2>Log In</h2>
        <p>Enter your credentials to access your account.</p>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;