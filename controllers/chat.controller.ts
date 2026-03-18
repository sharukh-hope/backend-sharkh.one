// controllers/chat.controller.js
import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({});

const SYSTEM_PROMPT = `You are an AI assistant for Sharukh Babu's portfolio.
Answer questions about his experience, skills, and projects.
Be friendly and concise.

About Sharukh:
- Full-stack Developer (MERN), based in Bangalore
- Worked at Gethertech (2021-2025) building real-time SaaS apps
- Skills: React, Node.js, Three.js, GSAP, MongoDB, WebSockets
- Built 40+ reusable components, schema-based form systems
- Integrated Zoom SDK, Mailchimp, Google Cloud Storage
- Projects: Waves Bazaar, JCBL (3D + GSAP), Lexus NX 360`;

export const chatController = async (message: string, history: object[]) => {
  return new Promise<any>((resolve, reject) => {
    const exec = async () => {
      try {
        const chat = genAI.chats.create({
          model: "gemini-2.5-flash",
          config: {
            systemInstruction: SYSTEM_PROMPT,
          },
          history,
        });
        const aiResponse = await chat.sendMessage({ message });

        resolve(aiResponse.text);
      } catch (error) {
        reject(error);
      }
    };
    exec();
  });
};
