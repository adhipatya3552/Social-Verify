# 🔍 Social-Verify

## 🧠 Project Overview

**Social-Verify** is a frontend-focused web application that helps users verify whether a social media account is real or fake. Just enter a username or profile URL for platforms like Twitter, Instagram, Facebook, or TikTok, and get an instant credibility report with a human-likelihood score. 

Key Highlights:

- ⚡ **Real-Time Verification**: Submit a profile and get instant results.
- 📊 **Credibility Score**: Numerical trust score with detailed factor breakdowns.
- 🤖 **Bot Behavior Indicators**: Flags for automated or suspicious activities.
- 🆚 **Comparison Tool**: Compare two accounts on overlap, content, and behavior.
- 📱 **Responsive UI**: Optimized for mobile, tablet, and desktop experiences.

---

## ✨ Features

1. **🔐 Account Verification**
   - Enter a username or full URL.
   - Select a platform (Twitter, Instagram, etc.).
   - Receive a complete report with credibility, human-likelihood, and insights.

2. **🆚 Account Comparison**
   - Compare two accounts.
   - View similarity scores, common followers, and behavior patterns.

3. **📈 Detailed Metrics**
   - Account age, engagement rate, content type, post frequency, etc.

4. **🧪 Mock Data**
   - Sample data for testing (via `verification-form.tsx`, `comparison-form.tsx`).

5. **⚙️ Extensible UI Components**
   - Built using `shadcn/ui` for clean forms, buttons, tabs, and accordions.

---

## 🛠 Tech Stack

- 💻 **Frontend**: React + TypeScript + Vite
- 🎨 **Styling**: Tailwind CSS
- 🧩 **UI Components**: shadcn/ui
- ✅ **Validation**: react-hook-form + Zod
- 🔄 **Data Fetching**: @tanstack/react-query
- 🚦 **Routing**: React Router (via `pages/`)
- 🔌 **Custom Utilities**: 
  - `lib/queryClient.ts`: API wrappers
  - `lib/types.ts`: Shared types
  - Custom hooks: `use-mobile`, `use-toast`

---

## 🚀 Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/adhipatya3552/Social-Verify.git
   cd Social-Verify
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173`.

---

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

---

## Mock Data & API

* By default, the app uses in-memory mock data defined in `verification-form.tsx` and `comparison-form.tsx`. Remove or replace these with real API calls by updating `apiRequest` URLs in `lib/queryClient.ts` and implementing a secure backend.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/YourFeature`.
3. Commit your changes: `git commit -m "Add YourFeature"`.
4. Push to the branch: `git push origin feature/YourFeature`.
5. Open a pull request describing your changes.