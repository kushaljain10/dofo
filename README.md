# DoFo - Don't Forget

**An AI co-pilot for relationships**

DoFo helps people maintain stronger relationships by remembering what matters, nudging at the right time, and advising on what to do or say next.

## Features

### 🏠 **Daily Plan (Home)**

- Personalized daily relationship actions (3-5 per day)
- AI-generated message drafts with contextual suggestions
- Progress tracking with visual completion indicators
- Priority-based action cards with due dates and context

### 🔍 **Multi-Use Search**

- **Search Mode**: Find people, notes, interactions, and promises
- **Add Mode**: Quickly capture notes, promises, and events
- **Ask Mode**: Get AI advice and contextual coaching
- Smart intent detection from natural language queries

### 👥 **People & Relationships**

- Comprehensive relationship management with health scores
- Circle-based organization (Family, Close, Friends, Work)
- Person profiles with interaction timelines and promises
- Cadence tracking and overdue contact alerts

### 📥 **Smart Inbox**

- AI-detected moments and relationship insights
- Birthday detection and milestone tracking
- Job change notifications and life event awareness
- Actionable suggestions for each detected moment

### 🤖 **AI Advice Engine**

- Contextual message drafting with tone variations
- Gift ideas and occasion-specific suggestions
- Relationship coaching and conflict resolution advice
- Privacy-first, personalized recommendations

### ⚙️ **Personalization**

- Customizable nudge intensity (Low, Medium, High)
- Quiet hours and notification preferences
- Multi-language support (English, Hindi)
- Relationship-specific tone settings

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom DoFo theme
- **Icons**: Heroicons
- **Routing**: React Router v6
- **Mobile-First**: Responsive design optimized for mobile devices

## Color Scheme

- **Primary**: Indigo (#4F46E5) - Trust and reliability
- **Secondary**: Teal (#0D9488) - Growth and harmony
- **Accent Colors**: Purple, Pink, Green for different relationship types
- **Neutral**: Gray scale for backgrounds and text

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd dofo
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the app

### Available Scripts

- `npm start` - Run the development server
- `npm test` - Launch the test runner
- `npm run build` - Build the app for production
- `npm run eject` - Eject from Create React App (⚠️ irreversible)

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Layout/          # Navigation and layout components
│   ├── Home/            # Home screen specific components
│   └── People/          # People management components
├── pages/               # Main application screens
│   ├── Home.tsx         # Daily Plan screen
│   ├── Search.tsx       # Multi-use search interface
│   ├── People.tsx       # Relationship management
│   ├── Inbox.tsx        # AI insights and moments
│   └── Profile.tsx      # User settings and preferences
├── types/               # TypeScript type definitions
├── data/                # Mock data and utilities
└── App.tsx              # Main application component
```

## Key Design Principles

1. **Mobile-First**: Optimized for mobile usage with touch-friendly interfaces
2. **Minimal Friction**: One search bar handles most interactions
3. **AI-Powered**: Contextual suggestions and automated insights
4. **Privacy-Focused**: Local processing where possible
5. **Relationship-Centric**: Everything organized around meaningful connections

## Mock Data

The current implementation uses comprehensive mock data including:

- 5 sample people with rich relationship data
- Daily actions with AI-generated message drafts
- Inbox items with various life event types
- Circle-based relationship organization
- Interaction history and promise tracking

## Future Enhancements

- **Real AI Integration**: Connect with OpenAI/Claude for live advice generation
- **Data Persistence**: Local storage and cloud sync
- **Contact Integration**: Import from device contacts and social platforms
- **Calendar Sync**: Automatic event detection and scheduling
- **Photo Intelligence**: On-device face recognition and moment detection
- **Push Notifications**: Smart timing for relationship nudges

## Contributing

This is a product demonstration built for showcasing the DoFo concept. The codebase serves as a foundation for future development.

## License

Private project - All rights reserved.

---

_Made with ❤️ for meaningful relationships_
