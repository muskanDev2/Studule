# Studule - Student Study Planner

Studule is a responsive web app that helps students plan subjects, track daily tasks, and organize study sessions based on exam dates and priority.

## Tech Stack

- React (frontend UI)
- Vite (build tool and dev server)
- Tailwind CSS (styling and responsive design)
- React Router DOM (page navigation)
- JavaScript (planner logic and interactions)

## What Has Been Built

### 1) Landing Page

- Modern hero section with clear call-to-action
- Features section with 3 cards
- Clean footer
- Mobile-first responsive design

### 2) Dashboard (Core Feature)

- Add Subject form with:
  - Subject name
  - Exam date
  - Priority (High / Medium / Low)
- Subjects section with:
  - Priority badge colors
  - Exam countdown (days left)
  - Daily plan guidance
- Daily Study Plan section with:
  - Checkbox-based task list
  - Completion progress bar
  - "Missed day" redistribution control

## Planner Logic Implemented

- If exam is near, daily tasks increase
- If priority is high, study load/time increases
- If user misses a day, tasks are redistributed
- Logic is simple, readable, and handled in utility functions

## Routing and Navigation

- `/` -> Landing page
- `/dashboard` -> Planner dashboard
- Standard React Router setup using `BrowserRouter`

## State Behavior

- Dashboard data is lifted to app-level state
- Data is preserved while navigating between pages
- Data resets on browser refresh (as requested)

## UI/UX Improvements

- Consistent pastel blue/purple visual theme
- Rounded corners, subtle shadows, smooth hover effects
- Better spacing, alignment, and typography hierarchy
- Responsive behavior tuned for mobile, tablet, and desktop
- Horizontal overflow handling to avoid scroll issues

## Project Structure

- `src/components` -> reusable UI blocks (`Layout`, `DailyTaskList`, etc.)
- `src/pages` -> route-level pages (`HomePage`, `DashboardPage`)
- `src/utils` -> planner and helper logic (`studyPlan.js`)

## How To Run Locally

1. Install dependencies:
   - `npm install`
2. Start development server:
   - `npm run dev`
3. Build for production:
   - `npm run build`

## Status

Project is structured, responsive, and ready for continued feature development and deployment.
