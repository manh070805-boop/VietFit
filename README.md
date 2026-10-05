# VietFit AI Demo

VietFit AI is an Adaptive Digital Personal Trainer that continuously changes the user's workout and nutrition plan based on real behavior, performance, and progress.

This is **Demo v0.1**, designed to demonstrate the core adaptive loop:
`Goal → Plan → Action → Feedback → Analysis → Adaptation → New Plan`

## Main Demo Features
- **Personalized Onboarding**: Creates a local profile.
- **Adaptive Daily Check-in**: Adapts today's workout based on available time.
- **Workout Logging & Overload**: Dynamically adjusts future loads based on performance and difficulty.
- **Nutrition Tracking & Adherence**: Monitors nutrition and tracks adherence.
- **Progress Intelligence**: Analyzes adherence and performance to determine if the plan should change.
- **AI Coach**: A chat interface that demonstrates how the system reacts to user inputs.

## How to install
1. Make sure you have Node.js installed.
2. Run `npm install` to install dependencies.

## How to run
1. Run `npm run dev` to start the development server.
2. Open the URL provided in the terminal (usually `http://localhost:5173`).
3. For the best experience, open developer tools in your browser and switch to a mobile viewport (e.g., iPhone 13 Pro).

## Project structure
- `/src/components`: Reusable layout and UI components (MainLayout, DemoMode).
- `/src/screens`: Main application screens (Onboarding, Home, Workout, etc).
- `/src/store`: Zustand state management acting as the centralized demo decision engine.
- `/src/types`: TypeScript definitions for the data models.

## Demo scenario
1. Complete onboarding.
2. Go to "Daily Check-in", choose "20 phút", and see the workout dynamically shortened.
3. Start the workout, log "Bench Press" as "Very Hard", and see the next workout load decrease.
4. Open the **AI Coach** and click the quick prompts to see how it analyzes data and adapts the plan.

## How to reset demo data
Click the gear icon (⚙️) in the top right corner of the application to open the **Developer Demo Controls**. 
From there, you can switch between simulated weeks or click **RESET DEMO DATA** to start over.

## Technology stack
- React (Vite)
- TypeScript
- Tailwind CSS
- React Router DOM
- Zustand (State management + LocalStorage persistence)
- Recharts (Data visualization)
- Lucide React (Icons)

## Current limitations
- The AI Coach uses deterministic rules for demo purposes, not an external LLM.
- Data is stored in `localStorage` and will be cleared if browser data is wiped.
- No actual backend or authentication is implemented.

## Future roadmap
- Camera Form Coach
- Wearable Integration
- Vietnamese Food Database
- Advanced AI Coach with real LLM integration
