import express from "express";
import {
  createLecture,
  editLecture,
  getCourseLectures,
  removeLecture,
} from "../controllers/lectureController.js";
import { getCreatorById } from "../controllers/userController.js";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";

const lectureRouter = express.Router();

lectureRouter.post("/createlecture/:courseId", isAuth, createLecture);
lectureRouter.get("/getcourselecture/:courseId", isAuth, getCourseLectures);
lectureRouter.post(
  "/editlecture/:lectureId",
  isAuth,
  upload.single("videoUrl"),
  editLecture
);
lectureRouter.delete("/removelecture/:lectureId", isAuth, removeLecture);
lectureRouter.post("/getcreator", isAuth, getCreatorById);

export default lectureRouter;
