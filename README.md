# Social-Verify

## Project Overview

Social-Verify is a frontend-focused web application that allows users to verify whether a social media account or profile ID is genuine or fake. Users can enter a username or full profile URL for platforms such as Twitter, Instagram, Facebook, and TikTok. The application analyzes various factors—account age, posting patterns, follower metrics, and behavioral indicators—to produce a comprehensive credibility report and human-likelihood score. Additionally, it offers an optional comparison feature to evaluate similarities between two different accounts.

Key features include:

* **Real-time Verification**: Submit a profile URL and platform, and receive detailed verification results instantly.
* **Credibility Score**: A numeric score reflecting overall trustworthiness, accompanied by granular factor analysis (e.g., Account Age, Engagement Ratio).
* **Bot Behavior Indicators**: Qualitative flags highlighting potential automated or suspicious behaviors.
* **Comparison Tool**: Compare two accounts side-by-side on metrics like follower overlap, content similarity, and behavior patterns.
* **Responsive UI**: Built with a mobile-first design, ensuring smooth experience on all devices.

## Tech Stack

* **Frontend**: React + TypeScript, Vite
* **UI Components**: Custom shadcn/ui components (Form, Button, Input, Tabs, Select, Accordion, Toaster)
* **Styling**: Tailwind CSS
* **Form Management & Validation**: react-hook-form + Zod
* **Data Fetching**: @tanstack/react-query (QueryClient, useMutation)
* **Routing**: React Router (via `pages` directory under Vite)
* **Utilities**: Fetch wrapper in `lib/queryClient.ts`, common types in `lib/types.ts`
* **State & Hooks**: Custom hooks (`use-mobile`, `use-toast`)

## Installation & Setup

1. **Clone the repository**

   git clone https://github.com/yourusername/Social-Verify.git
   cd Social-Verify

2. **Install dependencies**

   npm install

3. **Start the development server**

   npm run dev

   The app will be available at `http://localhost:5173`.

## Folder Structure

Social-Verify/
├── attached_assets/       
├── client/                
│   ├── public/           
│   ├── src/
│   │   ├── components/    
│   │   ├── hooks/         
│   │   ├── lib/           
│   │   ├── pages/         
│   │   ├── App.tsx       
│   │   └── main.tsx      
│   └── index.html         
├── theme.json             
├── tsconfig.json         
├── vite.config.ts        
└── .gitignore             

## Usage

1. **Verify an Account**

   * Navigate to the "Verification" page.
   * Select a platform (Twitter, Instagram, Facebook, TikTok).
   * Enter a username or full profile URL.
   * Click **Verify Account**.
   * Review the resulting credibility score, factor breakdown, bot behavior indicators, and improvement suggestions.

2. **Compare Two Accounts**

   * Go to the "Compare Accounts" page.
   * Enter two distinct account identifiers.
   * Click **Compare** to view similarity scores, common followers count, and other comparative metrics.

## Mock Data & API

* By default, the app uses in-memory mock data defined in `verification-form.tsx` and `comparison-form.tsx`. Remove or replace these with real API calls by updating `apiRequest` URLs in `lib/queryClient.ts` and implementing a secure backend.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/YourFeature`.
3. Commit your changes: `git commit -m "Add YourFeature"`.
4. Push to the branch: `git push origin feature/YourFeature`.
5. Open a pull request describing your changes.