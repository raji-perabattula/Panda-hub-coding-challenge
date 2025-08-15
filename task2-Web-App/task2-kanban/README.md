## Kanban Dashboard

A small **Kanban-style project management dashboard** built with Next.js (App Router), TypeScript, Redux Toolkit, redux-persist, Tailwind CSS, and @hello-pangea/dnd for drag‑and‑drop.

Design reference: [Figma](https://www.figma.com/design/ReIpaYRC5nKXxfdYjfgjP9/Project-Management-Dashboard--Community-?node-id=2-163&t=6LCkCzhDHjDUIqMl-0)

## Overview

This app focuses on state management + smooth drag‑and‑drop with a layout that mirrors the Figma file:
    Three columns (e.g., To Do, In Progress, Done), each displaying cards/tasks.
    Drag & drop between columns and within the same column.
    State persistence (cards and their order survive refresh and navigation) using redux-persist.
    Responsive layout for common breakpoints.

Clean, typed services layer (Axios) included for extensibility if/when a real API is available.

# Note on data: 
For this task the board is seeded locally (static + optional JSONPlaceholder mapping) and persisted to localStorage.

## Tech Stack
    Framework: Next.js 15 (App Router)
    Language: TypeScript 5
    State: Redux Toolkit 2 + react-redux 9
    Persistence: redux-persist (localStorage)
    Drag & Drop: @hello-pangea/dnd
    Styling: Tailwind CSS 4 + minimal SCSS tokens
    HTTP: Axios 1 (services prepared for future API)

## Project structure 
app/
  layout.tsx                // App shell (App Router)
  page.tsx                  // Dashboard scene (Sidebar + Header + Board)
  Providers.tsx             // For redux persistent data providing
  components/
    header/
        Header.tsx
        header.scss
    sidebar/
        Sidebar.tsx
        sidebar.scss
    dashboard/
        Dashboard.tsx           // Columns wrapper
        Column.tsx              // Column with droppable area
        Card.tsx                // Individual task card
        dashboard.scss
  styles/
    global.scss             // Global styles + Tailwind entry
    variables.scss         // SCSS vars (colors, radii, spacing)

store/
  index.ts                  // makeStore(), RootState, AppDispatch
  tasksSlice.ts             // columns, tasks, drag reducers, thunks,           
services/
  api.ts                    // Axios instance
  tasksService.ts           // Optional JSONPlaceholder mapping utilities

public/
  assets/
    images/…                // Static images (icons, placeholders)

### Getting started 
1. Install
```bash
npm install 
```
2. Run
```bash
npm run dev
```
3. Build/Start
```bash
npm run build
npm start
```

## Quick walkthrough
    1. store/tasksSlice.ts – how columns and tasks are modeled + reordering logic.
    2. components/Dashboard.tsx – API context + per-column rendering.
    3. components/Column.tsx - droppable/draggable wiring.
    4. components/Card.tsx – task card UI.
    4. services/api.ts + services/tasksService.ts – how to fetch/map tasks when an API is plugged in.

## Extending the App
    Search & filters across columns
    Task details modal (description, comments, attachments)
    Assignees picker + avatars
    Server sync (PATCH order to backend) once an API is provided
    Tests: reducer unit tests 
    Implement with original data
