import express from "express";

import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";
import {
  createCourse,
  editCourse,
  getCourseById,
  getCreatorCourses,
  getPublishedCourses,
  removeCourse,
  getCreatorById,
} from "../controllers/courseController.js";

const courseRouter = express.Router();

courseRouter.post("/create", isAuth, createCourse);
courseRouter.get("/getpublished", getPublishedCourses);
courseRouter.get("/getcreator", isAuth, getCreatorCourses);
courseRouter.put(
  "/edit/:courseId",
  isAuth,
  upload.single("thumbnail"),
  editCourse
);
courseRouter.get("/getcourse/:courseId", isAuth, getCourseById);
courseRouter.delete("/remove/:courseId", isAuth, removeCourse);
courseRouter.post("/creator", isAuth, getCreatorById);

export default courseRouter;
