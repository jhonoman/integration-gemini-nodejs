# Gemini Flash API

This project demonstrates how to use Google's Gemini AI API to generate content.

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
