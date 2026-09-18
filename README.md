# ⚡ Ahmad Fahrezi — Neo-Brutalist Developer Portfolio

A bold, high-performance personal portfolio built with **Next.js 16**, **React 19**, and **Tailwind CSS v4**, featuring a distinct **Neo-Brutalism** aesthetic, real-time **Spotify Widget** integration, bilingual support (ID/EN), and dark mode.

---

## ✨ Features

- 🎨 **Neo-Brutalism Design System**: High-contrast colors, crisp solid borders, bold offsets (`shadow-[4px_4px_0px_#1A1A2E]`), and retro-modern typography (**Space Grotesk**, **Inter**, **JetBrains Mono**).
- 🎵 **Live Spotify Deck**:
  - Displays currently playing or recently paused songs in real-time.
  - Interactive vinyl record animation that spins and accelerates on hover.
  - Smart track retention cache (in-memory + `localStorage`) so paused tracks don't jump backward to older scrobbles.
  - Powered by **Last.fm Scrobbler API** (supports Spotify Free) with fallback to official **Spotify Web API**.
- 🌐 **Bilingual (i18n)**: Seamless instant language switcher (Bahasa Indonesia 🇮🇩 / English 🇬🇧) without page reloads.
- 🌓 **Dark & Light Mode**: Curated color palettes with instant switching and persistent user preferences.
- 📱 **Fully Responsive**: Carefully tuned layouts across ultra-wide, desktop, tablet, and mobile screens.
- ✉️ **Contact Form**: Direct email delivery powered by **Resend API**.
- 🚀 **Smooth Scrolling**: Integrated with **Lenis** smooth scroll for an ultra-fluid browsing experience.
- 💼 **Modular Data Structure**: All personal information, projects, experiences, and skills are cleanly organized in the `data/` directory.

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + Custom Neo-Brutalist Tokens |
| **Smooth Scroll** | [Lenis](https://lenis.darkroom.engineering/) |
| **Email Service** | [Resend](https://resend.com/) |
| **Music APIs** | [Last.fm AudioScrobbler](https://www.last.fm/api) & [Spotify Web API](https://developer.spotify.com/) |

---

## 📁 Project Structure

```text
├── app/
│   ├── api/
│   │   ├── contact/route.ts      # Contact form endpoint (Resend)
│   │   └── spotify/route.ts      # Live Spotify status endpoint
│   ├── globals.css               # Global styles, fonts, and Tailwind v4 theme tokens
│   ├── layout.tsx                # Root layout, fonts, and metadata
│   └── page.tsx                  # Main single-page portfolio layout
├── components/
│   ├── About.tsx                 # About Me section with personal bio & quick facts
│   ├── Contact.tsx               # Contact form with interactive status feedback
│   ├── Experience.tsx            # Work & organizational experience timeline
│   ├── Footer.tsx                # Footer with copyright & quick social links
│   ├── Hero.tsx                  # Hero banner with typewriter effect & Spotify deck
│   ├── Navbar.tsx                # Fixed navigation bar with mobile hamburger menu
│   ├── Projects.tsx              # Projects grid with category filtering & modal/links
│   ├── Skills.tsx                # Technical & soft skills grouped by category
│   ├── SpotifyWidget.tsx         # Neo-brutalist interactive Spotify player widget
│   └── ThemeToggle.tsx           # Light / Dark mode toggle button
├── context/
│   └── LanguageContext.tsx       # Translation dictionaries & language provider
├── data/
│   ├── experience.ts             # Career & organizational history
│   ├── profile.ts                # Personal info, contact details, social links
│   ├── projects.ts               # Featured portfolio projects & metadata
│   └── skills.ts                 # Technical & tools proficiency list
├── public/                       # Static assets (images, CV, icons)
└── utils/                        # Helper utilities (scrolling, formatting)
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Panjullauditore/New-Portofolio.git
cd New-Portofolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env.local` file in the root directory:

```env
# Spotify Official API (Optional, for Spotify Premium)
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token

# Resend Email Configuration (Required for Contact Form)
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your_email@example.com

# Last.fm API (Required for Real-time Spotify Free playback tracking)
LASTFM_USERNAME=your_lastfm_username
LASTFM_API_KEY=your_lastfm_api_key
```

> **Note**: For Last.fm integration, simply create a free Last.fm API account at [last.fm/api/account/create](https://www.last.fm/api/account/create) and link your Spotify account to Last.fm scrobbling.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the portfolio.

### 5. Build for production

```bash
npm run build
npm run start
```

---

## ✏️ Customizing Content

To update the website with your own information:

1. **Profile & Socials**: Edit `data/profile.ts` (Name, bio, email, social media links).
2. **Projects**: Edit `data/projects.ts` (Add, remove, or update project titles, tags, screenshots, and URLs).
3. **Experience**: Edit `data/experience.ts` (Update your job roles, education, and dates).
4. **Skills**: Edit `data/skills.ts` (Modify frontend, backend, tools, and design capabilities).
5. **Translations**: Edit `context/LanguageContext.tsx` to customize English and Indonesian text.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

Crafted with 🖤 by **[Ahmad Fahrezi](https://github.com/Panjullauditore)**.
