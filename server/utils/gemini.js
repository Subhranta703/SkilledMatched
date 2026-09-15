import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing from environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-3.5-flash-lite",
  generationConfig: {
    temperature: 0.2,
    responseMimeType: "application/json",
  },
});

export const analyzeWithGemini = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    if (!text) {
      throw new Error("Gemini returned an empty response.");
    }

    try {
      return JSON.parse(text);
    } catch {
      console.error("Gemini returned invalid JSON:", text);
      throw new Error("Gemini returned invalid JSON.");
    }
  } catch (error) {
    console.error("Gemini API error:", error.message);

    throw new Error("Unable to generate AI analysis.");
  }
};
