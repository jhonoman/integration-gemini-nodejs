// DOM Elements
const chatToggle = document.getElementById('chat-toggle');
const chatContainer = document.getElementById('chat-container');
const closeChat = document.getElementById('close-chat');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const notificationBadge = document.getElementById('notification-badge');
const newHadithBtn = document.getElementById('new-hadith');

// Chat state
let conversation = [];
let isChatOpen = false;

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
  initializeChatWidget();
  loadPrayerTimes();
  loadRandomHadith();
  loadDailyPractices();
});

// Chat Widget Functions
function initializeChatWidget() {
  chatToggle.addEventListener('click', toggleChat);
  closeChat.addEventListener('click', closeChatWidget);

  // Close chat when clicking outside
  document.addEventListener('click', function(e) {
    if (!chatContainer.contains(e.target) && !chatToggle.contains(e.target) && isChatOpen) {
      closeChatWidget();
    }
  });
}

function toggleChat() {
  isChatOpen = !isChatOpen;
  chatContainer.classList.toggle('show', isChatOpen);
  notificationBadge.style.display = 'none';

  if (isChatOpen) {
    userInput.focus();
  }
}

function closeChatWidget() {
  isChatOpen = false;
  chatContainer.classList.remove('show');
}

// Prayer Times Functions
async function loadPrayerTimes() {
  try {
    // Using Jakarta coordinates for demo
    const response = await fetch('https://api.aladhan.com/v1/timingsByCity?city=Jakarta&country=Indonesia&method=2');
    const data = await response.json();

    if (data.code === 200) {
      displayPrayerTimes(data.data.timings);
    } else {
      throw new Error('Failed to load prayer times');
    }
  } catch (error) {
    console.error('Error loading prayer times:', error);
    document.getElementById('prayer-times').innerHTML = `
      <div class="prayer-item">
        <span class="prayer-name">Error loading prayer times</span>
      </div>
    `;
  }
}

function displayPrayerTimes(timings) {
  const prayerTimesDiv = document.getElementById('prayer-times');
  const prayers = [
    { name: 'Fajr', time: timings.Fajr, icon: '🌅' },
    { name: 'Dhuhr', time: timings.Dhuhr, icon: '☀️' },
    { name: 'Asr', time: timings.Asr, icon: '🌇' },
    { name: 'Maghrib', time: timings.Maghrib, icon: '🌆' },
    { name: 'Isha', time: timings.Isha, icon: '🌙' }
  ];

  prayerTimesDiv.innerHTML = prayers.map(prayer => `
    <div class="prayer-item">
      <span class="prayer-name">${prayer.icon} ${prayer.name}</span>
      <span class="prayer-time">${prayer.time}</span>
    </div>
  `).join('');
}

// Hadith Functions
async function loadRandomHadith() {
  try {
    // Using a sample hadith for demo - in production, you'd use a real API
    const sampleHadiths = [
      {
        text: "Rasulullah shallallahu 'alaihi wa sallam bersabda: 'Sebaik-baik amal adalah yang dilakukan secara konsisten meskipun sedikit.' (HR. Bukhari)",
        source: "HR. Bukhari"
      },
      {
        text: "Rasulullah shallallahu 'alaihi wa sallam bersabda: 'Barangsiapa yang menunjukkan kepada kebaikan maka dia mendapat pahala seperti pahala orang yang mengerjakannya.' (HR. Muslim)",
        source: "HR. Muslim"
      },
      {
        text: "Rasulullah shallallahu 'alaihi wa sallam bersabda: 'Agama adalah nasihat.' Para sahabat bertanya: 'Untuk siapa?' Beliau menjawab: 'Untuk Allah, kitab-Nya, rasul-Nya, dan untuk pemimpin kaum muslimin serta kaum muslimin umumnya.' (HR. Muslim)",
        source: "HR. Muslim"
      }
    ];

    const randomHadith = sampleHadiths[Math.floor(Math.random() * sampleHadiths.length)];
    displayHadith(randomHadith);
  } catch (error) {
    console.error('Error loading hadith:', error);
    document.getElementById('hadith-content').innerHTML = 'Error loading hadith';
  }
}

function displayHadith(hadith) {
  const hadithDiv = document.getElementById('hadith-content');
  hadithDiv.innerHTML = `
    <p>"${hadith.text}"</p>
    <cite>- ${hadith.source}</cite>
  `;
}

// Daily Practices Functions
function loadDailyPractices() {
  // Load saved practices from localStorage
  const savedPractices = JSON.parse(localStorage.getItem('dailyPractices') || '{}');

  // Update checkboxes based on saved state
  Object.keys(savedPractices).forEach(id => {
    const checkbox = document.getElementById(id);
    if (checkbox) {
      checkbox.checked = savedPractices[id];
    }
  });

  // Add event listeners to save state
  document.querySelectorAll('.practice-item input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', savePracticeState);
  });
}

function savePracticeState(e) {
  const checkbox = e.target;
  const savedPractices = JSON.parse(localStorage.getItem('dailyPractices') || '{}');
  savedPractices[checkbox.id] = checkbox.checked;
  localStorage.setItem('dailyPractices', JSON.stringify(savedPractices));
}

// Chat Functions
chatForm.addEventListener('submit', async function(e) {
  e.preventDefault();

  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  appendMessage('user', userMessage);
  userInput.value = '';

  // Add user message to conversation
  conversation.push({ role: 'user', text: userMessage });
  const loadingMsg = appendMessage('bot', 'Sedang berpikir...');

  try {
    // Send request to backend
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ conversation }),
    });

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;

      try {
        const errorData = await response.json();
        if (errorData?.error) {
          errorMessage = errorData.error;
        }
      } catch (_) {
        // Keep the fallback status message if the response isn't JSON.
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    const botMessage = data.result;

    if (loadingMsg) {
      loadingMsg.remove();
    }

    // Add bot response to conversation
    conversation.push({ role: 'assistant', text: botMessage });

    appendMessage('bot', botMessage, true); // true for markdown rendering

    // Show notification if chat is closed
    if (!isChatOpen) {
      notificationBadge.style.display = 'flex';
    }
  } catch (error) {
    console.error('Error:', error);
    if (loadingMsg) {
      loadingMsg.remove();
    }
    alert(`Error: ${error.message}`);
  }
});

// New Hadith Button
newHadithBtn.addEventListener('click', loadRandomHadith);

// Message Functions
function appendMessage(sender, text, isMarkdown = false) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);

  if (isMarkdown && sender === 'bot') {
    msg.innerHTML = marked.parse(text);
  } else {
    msg.textContent = text;
  }

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  return msg;
}

// Falling Stars Animation
function createFallingStars() {
  const starsContainer = document.getElementById('stars-container');
  const numberOfStars = 50;

  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    // Random properties for each star
    const size = Math.random() * 3 + 1; // 1-4px
    const left = Math.random() * 100; // 0-100%
    const delay = Math.random() * 10; // 0-10s delay
    const duration = Math.random() * 5 + 5; // 5-10s duration

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${left}%`;
    star.style.animationDelay = `${delay}s`;
    star.style.animationDuration = `${duration}s`;

    starsContainer.appendChild(star);
  }
}

// Music Controls
function initializeMusicControls() {
  const playPauseBtn = document.getElementById('play-pause-btn');
  const volumeSlider = document.getElementById('volume-slider');
  const audio = document.getElementById('shalawat-audio');
  const musicControls = document.getElementById('music-controls');

  let isPlaying = false;

  // Play/Pause functionality
  playPauseBtn.addEventListener('click', function() {
    if (isPlaying) {
      audio.pause();
      playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
      isPlaying = false;
    } else {
      audio.play().catch(error => {
        console.log('Audio play failed:', error);
        // Fallback: show message to user
        alert('Shalawat audio tidak dapat dimuat. Silakan gunakan audio lokal atau URL yang valid.');
      });
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
      isPlaying = true;
    }
  });

  // Volume control
  volumeSlider.addEventListener('input', function() {
    audio.volume = volumeSlider.value;
  });

  // Update play/pause button when audio ends
  audio.addEventListener('ended', function() {
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    isPlaying = false;
  });

  // Auto-hide controls after 3 seconds of inactivity
  let hideTimeout;
  function resetHideTimeout() {
    clearTimeout(hideTimeout);
    musicControls.style.opacity = '1';
    hideTimeout = setTimeout(() => {
      musicControls.style.opacity = '0.7';
    }, 3000);
  }

  // Show controls on hover
  musicControls.addEventListener('mouseenter', () => {
    musicControls.style.opacity = '1';
    clearTimeout(hideTimeout);
  });

  musicControls.addEventListener('mouseleave', resetHideTimeout);

  // Start the hide timeout
  resetHideTimeout();
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
  // ... existing initialization code ...

  // Add falling stars animation
  createFallingStars();

  // Initialize music controls
  initializeMusicControls();
});