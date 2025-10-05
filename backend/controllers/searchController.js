import Course from "../models/courseModel.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const searchWithAI = async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const { input } = req.body;
    if (!input || !String(input).trim()) {
      return res.status(400).json({ message: "Input is required" });
    }

    const q = String(input).trim();

    console.log("🔑 GEMINI_API_KEY:", process.env.GEMINI_API_KEY ? "Loaded ✅" : "Missing ❌");
    console.log("🟢 Received input:", q);

    const ai = new GoogleGenerativeAI(apiKey);

    const prompt=`You are an intelligent assistant for an LMS platform. A user will type any query about what they want to learn. Your task is to understand the intent and return one **most relevant keyword** from the following list of course categories and levels:

- App Development  
- AI/ML  
- AI Tools  
- Data Science  
- Data Analytics  
- Ethical Hacking  
- UI UX Designing  
- Web Development  
- Others  
- Beginner  
- Intermediate  
- Advanced  

Only reply with one single keyword from the list above that best matches the query. Do not explain anything. No extra text.

Query: ${input}`
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const keyword = result.response.text().trim();

    console.log("AI keyword:", keyword);

    const courses = await Course.find({
      isPublished: true,
      $or: [
        { title: { $regex: q, $options: "i" } },
        { subTitle: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { level: { $regex: q, $options: "i" } },
      ],
    });

    console.log("Found courses:", courses.length);

    if (courses.length > 0) {
      return res.status(200).json(courses);
    } else {
      const keywordCourses = await Course.find({
        isPublished: true,
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { subTitle: { $regex: keyword, $options: "i" } },
          { category: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
          { level: { $regex: keyword, $options: "i" } },
        ],
      });

      console.log("Found keyword-based courses:", keywordCourses.length);
      return res.status(200).json(keywordCourses);
    }
  } catch (error) {
    console.error("AI search error:", error);
    return res.status(500).json({
      message: "Failed to search courses",
      error: error.message,
      stack: error.stack,
    });
  }


};


export default searchWithAI;
