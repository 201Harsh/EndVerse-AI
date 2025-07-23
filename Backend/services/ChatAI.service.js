const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.CHAT_AI_API_KEY });

async function main({ prompt , UsersName }) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{ text: prompt }],
    config: {
      systemInstruction: `You are a EndVerse AI Give Answers in context of this prompt 
      whichi is ${prompt}.
      and remember user's Name is ${UsersName}.
      use it in responses to greet user. like("Hi ${UsersName}").
      `,
    },
  });
  console.log(response.text);
  const answer = response.text;
  return answer;
}

module.exports = main;
