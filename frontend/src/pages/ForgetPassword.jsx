import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

function ForgetPassword() {
  let navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [newpassword, setNewPassword] = useState("");
  const [conPassword, setConpassword] = useState("");
  const [showPass, setShowPass] = useState(false);
   
  // Step 1 - Sending OTP
  const handleStep1 = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/sendotp`,
        { email },
        { withCredentials: true }
      );
      setStep(2);
      toast.success(result.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  // Step 2 - Verifying OTP
  const handleStep2 = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/verifyotp`,
        { email, otp },
        { withCredentials: true }
      );
      toast.success(result.data.message);
      setStep(3);
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };
  // Step 3 - Resetting Password
  const handleStep3 = async (e) => {
    e.preventDefault();
    if (newpassword !== conPassword) {
      return toast.error("Passwords do not match");
    }
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/resetpassword`,
        { email, password: newpassword },
        { withCredentials: true }
      );
      toast.success(result.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md transition-all duration-300">
        {/* Step 1 - Email */}
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Forgot Password?
            </h2>
            <form className="space-y-5" onSubmit={handleStep1}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-black focus:outline-none"
                  placeholder="you@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black hover:bg-gray-800 transition text-white py-2 rounded-lg font-medium disabled:opacity-50"
              >
                {loading ? <ClipLoader size={25} color="white" /> : "Send OTP"}
              </button>
            </form>
          </>
        )}

        {/* Step 2 - OTP */}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
              Enter OTP
            </h2>
            <form className="space-y-5" onSubmit={handleStep2}>
              <label className="block text-sm font-medium text-gray-700">
                4-digit code sent to your email
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none tracking-widest text-center text-lg"
                placeholder="____"
                maxLength={4}
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black hover:bg-gray-800 transition text-white py-2 rounded-lg font-medium disabled:opacity-50"
              >
                {loading ? <ClipLoader size={25} color="white" /> : "Verify OTP"}
              </button>
            </form>
          </>
        )}

        {/* Step 3 - Reset Password */}
        {step === 3 && (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
              Reset Password
            </h2>
            <p className="text-sm text-gray-500 text-center mb-6">
              Enter a new password to regain access.
            </p>
            <form className="space-y-5" onSubmit={handleStep3}>
              {/* New Password */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type={showPass ? "text" : "password"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                  placeholder="Enter new password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newpassword}
                  required
                />
                <div
                  className="absolute top-9 right-3 cursor-pointer text-gray-500"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type={showPass ? "text" : "password"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                  placeholder="Re-enter new password"
                  onChange={(e) => setConpassword(e.target.value)}
                  value={conPassword}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black hover:bg-gray-800 transition text-white py-2 rounded-lg font-medium disabled:opacity-50"
              >
                {loading ? <ClipLoader size={25} color="white" /> : "Reset Password"}
              </button>
            </form>
          </>
        )}

        {/* Back to login */}
        <div
          className="text-center text-sm mt-6 text-gray-600 hover:text-black cursor-pointer transition"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
