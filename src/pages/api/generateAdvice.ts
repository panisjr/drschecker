import { GoogleGenAI } from "@google/genai";
import { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";
import { marked } from "marked";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const prompt = req.body.prompt;
    console.log("Prompt received:", prompt);

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: prompt }] }],
    });
    console.log(response.text);
    const text =
      response.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response received.";

    const advice = marked(text);
    res.status(200).json({ result: advice });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error generating content:", error.message);
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred." });
    }
  }
};

export default handler;
