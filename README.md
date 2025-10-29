# BookVerse — Book Review App (Frontend)

A modern, lightweight, and responsive **React frontend** for a book review application.  
Built with **Vite**, styled with **Pico CSS**, and powered by **React Router** for navigation and layout management.

---

## Tech Stack

- **Vite + React** — fast development and hot reloading
- **Pico CSS** — minimalist, class-light styling framework
- **React Router v6+** — declarative routing, nested layouts, and route guards
- **Axios** — secure API communication with JWT or cookie-based auth
- **Context API** — global authentication and state management

---

## Features Implemented

### Authentication

- Signup and Login pages with validation and server error handling
- Auth context for global `isLoggedIn` and user state
- Persistent authentication using JWT/cookies
- Protected routes (`ProtectedRoute`) for user-only pages

### Books CRUD

- **Books** page — displays all books in a responsive grid layout
- **BookDetail** page — shows a single book with title, author, genre, description, and published year
- **CreateBook** page — authenticated users can add new books
- **EditBook** page — reusable form that adapts for creating or editing books
- **Delete** functionality — confirmation before deletion and automatic redirect

### UI and Styling

- Unified **Button** component that normalizes Pico button/link styles
- Supports variants: `primary`, `secondary`, `contrast`, and custom `danger`
- Navbar with subtle shadow and border
- Reusable **ErrorMessage** component for consistent inline error display
- Responsive layout using Pico containers and grid utilities

---

## ⚙️ Getting Started

### 1️⃣ Clone the repo

```bash
git clone https://github.com/yourusername/bookverse-frontend.git
cd bookverse-frontend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

Create a `.env` file in the project root:

```
VITE_API_BASE_URL=http://localhost:5000
```

### 4️⃣ Run the app

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧭 Routing Overview

| Path              | Component    | Description                           |
| ----------------- | ------------ | ------------------------------------- |
| `/`               | `Signup`     | User registration form                |
| `/login`          | `Login`      | Existing user login                   |
| `/profile`        | `Profile`    | Shows logged-in user info (Protected) |
| `/books`          | `Books`      | Displays all books                    |
| `/books/new`      | `BookForm`   | Add new book (Protected)              |
| `/books/:id`      | `BookDetail` | View book details                     |
| `/books/:id/edit` | `BookForm`   | Edit book (Protected)                 |

---

## Reusable Components

| Component        | Purpose                                                   |
| ---------------- | --------------------------------------------------------- |
| `Button`         | Unified styling for buttons and links (supports variants) |
| `ErrorMessage`   | Displays error alerts consistently                        |
| `ProtectedRoute` | Restricts access to authenticated users                   |
| `Layout`         | Wraps pages with Navbar and Outlet                        |
| `Navbar`         | Navigation bar with active link highlighting              |
