# Multi-User Blogging Platform - Frontend

Next.js frontend for a multi-user blogging platform with SSR, SEO optimization, Google OAuth, and a rich text editor.

## Tech Stack

- **Framework:** Next.js 15 (React 18)
- **UI:** Ant Design, Reactstrap (Bootstrap), Styled Components
- **Rich Text Editor:** TinyMCE
- **Auth:** JWT + Google OAuth
- **Comments:** Disqus
- **Analytics:** Google Analytics (gtag.js)
- **Syntax Highlighting:** Prism.js

## Features

- Server-side rendered pages for SEO
- User signup with email-based account activation
- Google OAuth login
- Password reset flow
- Blog creation with rich text editor and image upload
- Blog listing with categories, tags, and search
- Related posts
- SEO meta tags (Open Graph, title, description)
- User profiles (public and private)
- Admin dashboard (blog/category/tag management)
- User dashboard (manage own blogs and profile)
- Contact form and author messaging
- Disqus comment threads on blog posts
- Google Analytics integration
- Responsive design

## Project Structure

```
pages/               # Next.js pages (file-based routing)
  admin/             # Admin dashboard pages
  auth/              # Account activation, password reset
  blogs/             # Blog listing and detail pages
  categories/        # Category pages
  tags/              # Tag pages
  user/              # User dashboard pages
  profile/           # Public user profiles
components/          # Reusable React components
  authComp/          # Auth components (signin, signup, Google login)
  blogComp/          # Blog components (cards, CRUD, search)
  crud/              # Category and tag CRUD components
  form/              # Contact form
actions/             # API action creators (fetch calls to backend)
lib/                 # Utility libraries (Google Analytics)
config.js            # App configuration (reads from next.config.js)
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- Backend API running (see [backend repo](../backendHumbleBee))

### Installation

```bash
git clone <repo-url>
cd frontendHumbleBee
npm install
```

### Configuration

Copy the example config and fill in your values:

```bash
cp next.config.example.js next.config.js
```

Edit `next.config.js` with your settings:

| Key | Description |
|-----|-------------|
| `APP_NAME` | Your application name |
| `API_DEVELOPMENT` | Backend API URL for development |
| `API_PRODUCTION` | Backend API URL for production |
| `PRODUCTION` | Set to `true` for production mode |
| `DOMAIN_DEVELOPMENT` | Frontend URL for development |
| `DOMAIN_PRODUCTION` | Frontend URL for production |
| `FB_APP_ID` | Facebook App ID (Open Graph / SEO) |
| `SHORTNAME` | Disqus shortname for comments |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID |
| `GA_TRACKING_ID` | Google Analytics Measurement ID |

### Run

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

The app runs on `http://localhost:3000` by default.

## Deployment

The app is designed to run behind a reverse proxy (e.g., Nginx) that routes:
- `/api/*` to the backend (port 8000)
- `/*` to the frontend (port 3000)

Use a process manager like PM2 for production:

```bash
pm2 start npm -- start
```

## License

ISC
