# KeyCry

A fast, minimal typing speed test application inspired by MonkeyType. Built with modern web technologies for a smooth, responsive typing experience.

## Overview

KeyCry is an open-source typing test platform that helps users measure and improve their typing speed and accuracy. The application features real-time feedback, multiple test modes, user authentication, and persistent result tracking.

## Features

### Typing Test
- Multiple test modes: Time-based, Word count, Quote, and Zen mode
- Configurable time limits: 15, 30, 60, or 120 seconds
- Configurable word counts: 10, 25, 50, or 100 words
- Optional punctuation and numbers
- Real-time WPM and accuracy display
- Smooth caret animation
- Character-by-character feedback

### User Features
- User authentication (sign up, login, logout)
- Personal profile pages
- Result history and statistics
- Public leaderboards
- Profile settings

### Statistics Tracked
- Words Per Minute (WPM)
- Raw WPM
- Accuracy percentage
- Correct and incorrect characters
- Test duration

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| UI Library | React 19 |
| Styling | Tailwind CSS |
| Components | shadcn/ui, Radix UI |
| Icons | Lucide React |
| Authentication | Supabase Auth |
| Database | Supabase (PostgreSQL) |
| Package Manager | Bun |

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Supabase account (for authentication and database)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/keycry.git
cd keycry
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

5. Start the development server:
```bash
bun run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
keycry/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── api/
│   │   │   ├── prompts/
│   │   │   └── results/
│   │   ├── leaderboards/
│   │   ├── profile/
│   │   │   ├── [username]/
│   │   │   └── settings/
│   │   ├── error.tsx
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── layouts/
│   │   ├── sections/
│   │   └── ui/
│   └── lib/
│       ├── supabase/
│       ├── typing.ts
│       ├── utils.ts
│       └── words.ts
├── public/
├── .env.local
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## API Reference

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/prompts` | Retrieve random typing prompts |
| GET | `/api/prompts?mode=quote` | Retrieve a random quote |
| GET | `/api/results` | Fetch user's saved results |
| POST | `/api/results/save` | Save a typing test result |

### Save Result Payload

```json
{
  "wpm": 85,
  "rawWpm": 90,
  "accuracy": 97.5,
  "testMode": "time",
  "testDuration": 30,
  "wordCount": null,
  "correctChars": 150,
  "incorrectChars": 4
}
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Tab | Restart current test |
| Esc | Unfocus text input |

## Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server |
| `bun run build` | Build for production |
| `bun run start` | Start production server |
| `bun run lint` | Run ESLint |

### Database Schema

The application uses Supabase for data persistence. Key tables include:
- `profiles` - User profile information
- `results` - Typing test results

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

### Code Style

- Follow existing code conventions
- Use TypeScript strict mode
- Format code with Prettier
- Lint with ESLint before committing

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [MonkeyType](https://monkeytype.com) - Design inspiration
- [shadcn/ui](https://ui.shadcn.com) - UI components
- [Supabase](https://supabase.com) - Backend services
