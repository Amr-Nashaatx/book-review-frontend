import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Books from "./pages/Books.jsx";
import BookDetail from "./pages/BookDetail.jsx";
import BookForm from "./pages/BookForm.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="books" element={<Books />} />

        <Route
          path="books/new"
          element={
            <ProtectedRoute>
              <BookForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="books/:id/edit"
          element={
            <ProtectedRoute>
              <BookForm mode="edit" />
            </ProtectedRoute>
          }
        />
        <Route path="books/:id" element={<BookDetail />} />
        <Route path="shelves/:id" element={<ShelfDetail />} />
      </Route>
    </Routes>
  );
}
