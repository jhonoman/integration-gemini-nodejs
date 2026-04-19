# Muslim AI Assistant

A comprehensive Islamic AI assistant built with Google's Gemini API, featuring prayer times, daily hadith, practice tracking, and AI-powered Q&A.

## Features

- 🕌 **Prayer Times**: Real-time prayer times for Jakarta, Indonesia
- 📖 **Daily Hadith**: Random inspirational hadith from authentic sources
- ✅ **Practice Tracker**: Daily Islamic practice checklist with local storage
- 🤖 **AI Chat**: Syafi'i Fiqh Q&A powered by Google Gemini
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Backend**: Node.js, Express.js, Google Gemini API
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **APIs**: Google Gemini, Al-Adhan Prayer Times API
- **Libraries**: Marked.js for markdown rendering, Font Awesome icons

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gemini-flash-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Create a `.env` file in the root directory
   - Add your Google Gemini API key:
     ```
     GEMINI_API_KEY=your_api_key_here
     ```

4. **Run the application**
   ```bash
   npm start
   # or
   node index.js
   ```

5. **Open in browser**
   - Navigate to `http://localhost:3000`
   - The frontend will be served from the `public/` directory

## Project Structure

```
gemini-flash-api/
├── public/                 # Frontend static files
│   ├── index.html         # Main dashboard HTML
│   ├── style.css          # Styling and responsive design
│   └── script.js          # Frontend JavaScript logic
├── index.js               # Express server and API endpoints
├── package.json           # Node.js dependencies
├── .env                   # Environment variables (not in repo)
└── README.md             # This file
```

## API Endpoints

- `GET /` - Serves the main dashboard
- `POST /api/chat` - AI chat endpoint for Islamic Q&A
- `GET /style.css` - Serves CSS file
- `GET /script.js` - Serves JavaScript file

## Features in Detail

### Prayer Times Widget
- Fetches real-time prayer times using Al-Adhan API
- Displays Fajr, Dhuhr, Asr, Maghrib, and Isha times
- Location: Jakarta, Indonesia (configurable)

### Hadith Section
- Random hadith from authentic sources (Bukhari, Muslim)
- "New Hadith" button for randomization
- Beautiful typography and Islamic styling

### Daily Practices Tracker
- Interactive checklist for common Islamic practices
- Progress saved to browser's localStorage
- Includes: Subuh prayer, Quran reading, morning dhikr, charity, Dhuhr prayer

### AI Chat Widget
- Floating chat widget in bottom-right corner
- Markdown rendering for formatted responses
- Conversation history maintained
- Syafi'i Fiqh specialization
- Error handling with user-friendly alerts

### Falling Stars Animation
- Beautiful animated falling stars background
- 50 randomly positioned and timed stars
- Creates serene Islamic atmosphere
- Performance optimized with CSS animations

### Shalawat Music Player
- Integrated audio player for Islamic devotional music
- Play/pause controls with volume slider
- Auto-hide controls for clean interface
- Loop playback for continuous listening
- Easy to customize with your own shalawat audio files

## Audio Setup

To add your own shalawat music:

1. Add your shalawat audio file (MP3/WAV) to the `public/` directory
2. Update the audio source in `index.html`:
   ```html
   <source src="your-shalawat-file.mp3" type="audio/mpeg">
   ```
3. Or use online shalawat URLs from Islamic audio sources

## Development

### Adding New Features
- Frontend files are in `public/` directory
- Backend API endpoints in `index.js`
- Static files are automatically served by Express

### Customization
- Modify prayer location in `script.js`
- Add more hadith in the `sampleHadiths` array
- Customize AI system instructions in the `/api/chat` endpoint
- Update styling in `style.css`

## Deployment

This application can be deployed to any Node.js hosting service:

1. **Environment Variables**: Set `GEMINI_API_KEY` in your deployment environment
2. **Build**: No build step required (pure Node.js)
3. **Static Files**: Frontend is served directly from `public/` directory

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or issues:
- Check the browser console for errors
- Ensure your Gemini API key is valid
- Verify internet connection for prayer times API