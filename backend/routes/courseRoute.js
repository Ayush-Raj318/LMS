import express from "express";
import {
  createCourse,
  editCourse,
  getCourseById,
  getCreatorCourses,
  getPublishedCourses,
  removeCourse,
} from "../controllers/courseController";
import isAuth from "../middlewares/isAuth";
import upload from "../middlewares/multer";

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
