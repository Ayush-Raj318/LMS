import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  getCurrentUser,
  updateProfile,
} from "../controllers/userController.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.get("/currentuser", isAuth, getCurrentUser);
userRouter.post(
  "/profile",
  isAuth,
  upload.single("photoUrl"),
  updateProfile
);

export default userRouter;
