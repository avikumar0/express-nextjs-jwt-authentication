"use client";
import { useState } from "react";
import urlJoin from "url-join";
import publicRequest from "../utils/publicRequest";
import Cookies from "js-cookie";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

const useAuth = () => {
  const [error, setError] = useState(null);
  const authUrl = urlJoin(baseUrl, "api/user");

  const handleLogin = async (credentials) => {
    const loginUrl = urlJoin(authUrl, "/login");
    try {
      console.log("Sending login request to:", loginUrl);
      const data = await publicRequest(loginUrl, "POST", credentials);
      console.log("Response data:", data);
      if (data.status !== "success") {
        setError(data.message || "Login failed");
      } else {
        setError(null);
        Cookies.set("jwt-token", data.token);
        Cookies.set("email", credentials.email);
      }
      return data;
    } catch (error) {
      console.error("Login error:", error);
      setError(String(error));
      return { status: "error", message: String(error) };
    }
  };

  const handleRegister = async (credentials) => {
    const registerUrl = urlJoin(authUrl, "/register");
    try {
      console.log("Sending registration request to:", registerUrl);
      const data = await publicRequest(registerUrl, "POST", credentials);
      console.log("Response data:", data);
      if (data.status !== "success") {
        setError(data.message || "Registration failed");
        return { status: "error", message: data.message };
      }
      setError(null);
      return { status: "success", message: data.message };
    } catch (error) {
      console.error("Registration error:", error);
      setError("An error occurred during registration");
      return { status: "error", message: String(error) };
    }
  };

  const handleResetPasswordLink = async (email) => {
    const resetPasswordLinkUrl = urlJoin(authUrl, "/send-reset-password-email");
    try {
      console.log("Sending reset password link request to:", resetPasswordLinkUrl);
      const data = await publicRequest(resetPasswordLinkUrl, "POST", { email });
      console.log("Response data:", data);
      if (data.status !== "success") {
        setError(data.message || "Failed to send reset password link");
        return { status: "error", message: data.message };
      }
      setError(null);
      return { status: "success", message: data.message };
    } catch (error) {
      console.error("Reset password link error:", error);
      setError("An error occurred while sending reset password link");
      return { status: "error", message: String(error) };
    }
  };

  const handleResetPassword = async (id, token, newPassword) => {
    const resetPasswordUrl = urlJoin(authUrl, `/reset-password/${id}/${token}`);
    try {
      console.log("Sending reset password request to:", resetPasswordUrl);
      const data = await publicRequest(resetPasswordUrl, "POST", { newPassword });
      console.log("Response data:", data);
      if (data.status !== "success") {
        setError(data.message || "Failed to reset password");
        return { status: "error", message: data.message };
      }
      setError(null);
      return { status: "success", message: data.message };
    } catch (error) {
      console.error("Reset password error:", error);
      setError("An error occurred while resetting password");
      return { status: "error", message: String(error) };
    }
  };

  const handleChangePassword = async (values) => {
    const changePasswordUrl = urlJoin(authUrl, "/changepassword");
    try {
      const token = Cookies.get("jwt-token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await fetch(changePasswordUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(values)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to change password");
      }
      return data;
    } catch (error) {
      setError(String(error));
      return { status: "error", message: String(error) };
    }
  };

  const getProfile = async () => {
    const profileUrl = urlJoin(authUrl, "/loggeduser");
    try {
      const token = Cookies.get("jwt-token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await fetch(profileUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch profile");
      }
      return data;
    } catch (error) {
      setError(String(error));
      return { status: "error", message: String(error) };
    }
  };

  return { error, handleLogin, handleRegister, handleResetPasswordLink, handleResetPassword, handleChangePassword, getProfile };
};

export default useAuth;
