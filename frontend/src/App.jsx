import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import getCurrentUser from "./customHooks/getCurrentUser";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import ForgetPassword from "./pages/ForgetPassword";
import EditProfile from "./pages/EditProfile";
export const serverUrl = "http://localhost:8000";

function App() {
  getCurrentUser();
  const { userData } = useSelector((state) => state.user);
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/signup"
          element={!userData ? <SignUp /> : <Navigate to={"/"} />}
        />
        <Route
          path="/profile"
          element={userData ? <Profile /> : <Navigate to={"/signup"} />}
        />
        <Route path="/forget" element={<ForgetPassword />} />
        <Route
          path="/editprofile"
          element={userData ? <EditProfile /> : <Navigate to={"/signup"} />}
        />
      </Routes>
    </>
  );
}

export default App;
