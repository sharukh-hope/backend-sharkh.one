import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({}); // hardcode it temporarily

// Run this standalone, outside of any controller
const test = async () => {
  console.log("testing...");
  const response = await genAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "say hello",
  });
  console.log("response:", response.text);
};

test();
