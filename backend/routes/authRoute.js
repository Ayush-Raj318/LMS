import express from "express";
import {
  signUp,
  login,
  logOut,
  sendOtp,
  verifyOtp,
  resetPassword,
  googleSignup,
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.get("/logout", logOut);
authRouter.post("/sendotp", sendOtp);
authRouter.post("/verifyotp", verifyOtp);
authRouter.post("/resetpassword", resetPassword);
authRouter.post("/googlesignup", googleSignup);

export default authRouter;
