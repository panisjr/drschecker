import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";
import { marked } from "marked";
dotenv.config();
const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY || "AIzaSyCBftVwQ3kM4cZqZINi5ZLxMN18b2Mzz2U"
);
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const prompt = req.body.prompt;
      console.log("Prompt received:", prompt);
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text =
        response?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response received.";
      const advice = marked(text);
      res.status(200).json({ result: advice });
    } catch (error) {
      // Type guard to check if error is an instance of Error
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred." });
      }
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
