import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { addReview, getCourseReviews, getAllReviews } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/createreview", isAuth, addReview);
reviewRouter.get("/getreview", getCourseReviews);
reviewRouter.get("/getallreviews", getAllReviews);
export default reviewRouter;