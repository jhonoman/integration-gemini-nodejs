import { GoogleGenAI } from "@google/genai";
import "dotenv/config";
import cors from 'cors';
import express from 'express'
import multer from "multer";

const app = express();
const upload = multer();
// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const GEMINI_MODEL = "gemini-2.5-flash-lite";

app.use(express.json());
app.use(cors());
app.use(express.static('public')); 

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.post('/generate-text', upload.none(), async (req, res) => { 
    try {
        const { contents } = req.body;
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents,
        });
        res.json({ text: response.text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while generating content.' });
    }
});

app.post('/generate-file', upload.single('file'), async (req, res) => {
    try {
        const { prompt } = req.body;
        const base64Image = req.file.buffer.toString('base64');
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: [
                { type: "text", text: prompt },
                { inlineData: { mimeType: req.file.mimetype, data: base64Image } }
            ]
        });
        res.status(200).json({ result: response.text });
    }  catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while generating content.' });
    }
});

app.post('/api/chat', async (req, res) => {
  try {
    const { conversation } = req.body;

    if (!Array.isArray(conversation)) {
      return res.status(400).json({ error: 'Invalid conversation format. Expected an array of messages.' });
    } else if (conversation.length === 0) {
      return res.status(400).json({ error: 'Conversation cannot be empty.' });
    }

    const contents = conversation.map(({role, text}) => ({ 
      role: role === 'assistant' ? 'MODEL' : 'USER',
      parts: [{ text }]
    }));

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents,
      config: {
        temperature: 0.9,
        systemInstruction: `
        You are an advanced AI agent specialized in providing Islamic legal (Fiqh)
         answers exclusively according to the authoritative positions of the Syafi'i school of thought (Mazhab Syafi'i). 
         Your goal is to deliver accurate, respectful, and well-sourced information to users seeking to understand Syafi'i rulings on various aspects of life.
        `
      },
    });
    res.status(200).json({ result: response.text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

/*
async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works in a few word",
  });
  console.log(response.text);
}
  */

// main();