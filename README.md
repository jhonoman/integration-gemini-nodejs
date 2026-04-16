# Gemini Flash API

This project demonstrates how to use Google's Gemini AI API to generate content.

## Setup

step 1: npm init -y
step 2: npm install dotenv @google/genai
step 3: tambahkan "type": "module" di package.json
step 4: copy & paste base code dari ai google studio
step 5: import 'dotenv/config'
step 6: buat file .env lalu isi dengan GEMINI_API_KEY={apikey kalian}
step 7: ketika initiate GoogleGenAI, tambahkan property apiKey: process.env.GEMINI_API_KEY
step 8: ubah model sesuai dengan yang diinginkan

## How to Run

1. Ensure you have Node.js installed.
2. Install dependencies: `npm install`
3. Create a `.env` file with your Gemini API key: `GEMINI_API_KEY=your_api_key_here`
4. Run the script: `npm start` or `node index.js`

## APIs Used

- **Google Gemini API**: Used for generating AI content via the `@google/genai` library.
- **dotenv**: For loading environment variables from `.env` file.

## Dependencies

- `@google/genai`: ^1.50.1
- `dotenv`: ^17.4.2
- `express`: ^5.2.1 (not currently used in the main script)
- `multer`: ^2.1.1 (not currently used in the main script)