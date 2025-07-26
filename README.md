Vue.js Quiz Application

Setup Instructions=>

Clone the repository:
git clone https://github.com/youssre/Quiz-App.git

Navigate to the project directory:
cd vue-quiz-app

Install dependencies:
npm install

Run the development server:
npm run dev

Open your browser and navigate to http://localhost:5173.

Time Spent
Approximately 4.5 hours .
Thought Process & Implementation Steps

Setup: Initialized a Vue 3 project with Vite, added Pinia (npm install pinia), jsPDF (npm install jspdf), and Tailwind CSS.
State Management:
quiz.js: Manages quiz state (questions, answers, score, timer, etc.).
global.js: Manages global dark mode state and language state.

Core Features:
Dynamic question rendering with radio/checkbox inputs.
Immediate feedback with correct/incorrect highlighting.
5-minute countdown timer with auto-submission.
Progress bar and question counter.
Answer shuffling on load.
Score tracking and final results.

Bonus Features:
Difficulty level display for each question.
Global dark mode toggle in the header, managed via Pinia.
PDF export for individual question results using jsPDF in QuizQuestion.vue.
language switcher for English and Arabic.

Hosting
