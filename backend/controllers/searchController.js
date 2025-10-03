import Course from "../models/courseModel.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const searchWithAI = async (req, res) => {
  try {
    const { input } = req.body;
    if (!input || !String(input).trim()) {
      return res.status(400).json({ message: "Input is required" });
    }
    const q = String(input).trim();

    const ai = new GoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const prompt = `You are an intelligent assistant for an LMS platform. A user will type any query about what they want to learn. Your task is to understand the intent and return one **most relevant keyword** from the following list of course categories and levels:

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

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    const keyword = response.text();

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

    if (courses.length > 0) {
      return res.status(200).json(courses);
    } else {
      const courses = await Course.find({
        isPublished: true,
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { subTitle: { $regex: keyword, $options: "i" } },
          { category: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
          { level: { $regex: keyword, $options: "i" } },
        ],
      });
      return res.status(200).json(courses);
    }
  } catch (error) {
    return res.status(500).json({ message: "Failed to search courses" });
  }
};

export default searchWithAI;
