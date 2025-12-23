import React, { useState } from "react";
import "./LoginPage.css";
import { API_URL } from "../config";

export default function LoginPage({ onSignUpClick, onSuccess }) {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      // ✅ FIXED: added /api
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrUsername, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      // save token
      localStorage.setItem("token", data.token);

      // ✅ FIXED: added /api
      const userRes = await fetch(`${API_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      const userData = await userRes.json();

      if (!userRes.ok) {
        setError(userData.error || "Failed to load user");
        return;
      }

      if (onSuccess) onSuccess(userData.user);
    } catch (err) {
      console.error(err);
      setError("Network error, try again.");
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Log In</h1>

        <form className="form-fields" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email or username"
            className="input-field"
            required
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-submit">
            Log In
          </button>

          {error && <p className="error-text">{error}</p>}
        </form>

        <p className="signup-text">
          New here?{" "}
          <span className="signup-link" onClick={onSignUpClick}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
