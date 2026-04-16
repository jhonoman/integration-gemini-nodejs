import { GoogleGenAI } from "@google/genai";
import "dotenv/config";
import express from 'express'
import multer from "multer";

const app = express();
const upload = multer();
// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const GEMINI_MODEL = "gemini-2.5-flash";

app.use(express.json());

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