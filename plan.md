# MERN Portfolio Website - Project Plan

## Project Structure

```
my-portfolio/
├── client/                    # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── DarkModeToggle.jsx
│   │   ├── context/
│   │   │   └── ThemeContext.jsx
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── tailwind.config.js
├── server/                    # Node.js + Express backend
│   ├── models/
│   │   ├── Contact.js
│   │   └── Project.js
│   ├── routes/
│   │   ├── contact.js
│   │   └── projects.js
│   ├── seed.js                # Seed database with sample projects
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── plan.md
└── README.md
```

## Implementation Phases

### Phase 1: Backend Setup
- Initialize Node.js project with Express
- Set up MongoDB connection via Mongoose
- Create `Contact` model (name, email, message, createdAt)
- Create `Project` model (title, description, image, techStack, liveUrl, githubUrl)
- Build REST API routes:
  - `POST /api/contact` - Submit contact form
  - `GET /api/projects` - Fetch all projects
- Add CORS, body-parser, environment variable support
- Create seed script with sample projects

### Phase 2: Frontend Setup
- Initialize React app with Create React App
- Install Tailwind CSS for styling
- Set up React Router for navigation
- Create ThemeContext for dark mode

### Phase 3: UI Components
- **Navbar**: Fixed top nav with links, dark mode toggle
- **Hero**: Full-screen intro with name, title, CTA button
- **About**: Bio section with profile description
- **Projects**: Grid of project cards fetched from API
- **Skills**: Tech skills displayed as categorized tags
- **Contact**: Form that POSTs to backend API
- **Footer**: Social links and copyright

### Phase 4: Features
- Dark mode toggle with localStorage persistence
- Smooth scroll navigation
- CSS animations and transitions
- Responsive breakpoints (mobile/tablet/desktop)

### Phase 5: Deployment Config
- Vercel config for frontend (`vercel.json`)
- Backend `.env.example` for Render/Railway deployment

## API Endpoints

| Method | Route           | Description              |
|--------|-----------------|--------------------------|
| GET    | /api/projects   | Fetch all projects       |
| POST   | /api/contact    | Submit contact message   |

## Database Models

### Contact
- `name` (String, required)
- `email` (String, required)
- `message` (String, required)
- `createdAt` (Date, default: now)

### Project
- `title` (String, required)
- `description` (String, required)
- `image` (String)
- `techStack` (Array of Strings)
- `liveUrl` (String)
- `githubUrl` (String)
- `featured` (Boolean, default: false)
- `order` (Number)

## Tech Stack
- **Frontend**: React 18, React Router v6, Tailwind CSS 3
- **Backend**: Node.js, Express 4, Mongoose 7
- **Database**: MongoDB (Atlas compatible)
- **Deployment**: Vercel (frontend), Render/Railway (backend)
