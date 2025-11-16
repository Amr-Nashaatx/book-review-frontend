# BookVerse — Book Review App (Frontend)

A modern, lightweight, and responsive **React frontend** for a full book browsing and review experience.
Built with **Vite**, styled using **Pico CSS**, and powered by **React Router** for routing and layouts.
State management, caching, and pagination are handled through a robust **Zustand store**.

---

## Tech Stack

- React + Vite
- Zustand
- Pico CSS
- React Router v6+
- Axios

---

## Core Features

### Authentication
- Signup & Login with validation
- Global auth state via Context
- Persistent sessions (JWT/cookies)
- Protected routes

---

### Books Browsing & CRUD

#### Books Page
- Responsive grid layout
- Infinite scroll with cursor-based pagination
- Cached results using Zustand
- Scroll restoration after loading more

#### Book Detail Page
- Full book info: title, author, genre, description, year
- Uses cached data when possible

#### Add / Edit / Delete Books
- Reusable form for both create and edit
- Delete flow with confirmation & redirect

---

## Filtering System

### Filters UI
- Collapsible filter section
- Centered, clean layout

### Available Filters
- Multi-select genres (react-select)
- Author search
- Minimum rating
- Sorting (title, rating, year)

### Logic
- Filters stored globally using Zustand
- Applying filters triggers new fetch

---

## Global State (Zustand)

### State Slices
- booksData (cached pages + cursor)
- filters (global filter state)
- isLoading / error

### Advantages
- Prevents duplicate API calls
- Persistent global data
- Hydration-safe effects
- Smooth infinite-scroll behavior

---

## Routing Overview

/ → Signup  
/login → Login  
/profile → Profile (Protected)  
/books → Books Page  
/books/new → Add Book (Protected)  
/books/:id → Book Details  
/books/:id/edit → Edit Book (Protected)

---

## Getting Started

git clone https://github.com/yourusername/bookverse-frontend.git
cd bookverse-frontend
npm install

Create .env:

VITE_API_BASE_URL=http://localhost:5000

Run:

npm run dev

Visit: http://localhost:5173

---

## Summary
This frontend now includes:
- Full authentication
- Infinite scrolling
- Global caching
- Advanced filtering
- Robust Zustand architecture

