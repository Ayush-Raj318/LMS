import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { addReview, getCourseReviews } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/createreview", isAuth, addReview);
reviewRouter.get("/getreview", getCourseReviews);

export default reviewRouter;