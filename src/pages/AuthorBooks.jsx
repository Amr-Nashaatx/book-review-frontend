import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BookStatusFilter from "../components/BookStatusFilter";
import { BookSortSelect } from "../components/BookSortSelect";
import BooksTable from "../components/BooksTable";
import Toast from "../components/Toast/Toast";
import { useFetchMyBooks } from "../hooks/useFetchMyBooks";
import Pagination from "../components/Pagination";

export default function AuthorBooks() {
  const location = useLocation();
  const [toastMsg, setToastMsg] = useState(location.state?.message || "");

  const { fetchMyBooks, myBooks, pageInfo } = useFetchMyBooks();
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchMyBooks(filters);
  }, [filters, fetchMyBooks]);

  const onStatusChange = (status) => {
    setFilters((prev) => ({ ...prev, status }));
  };
  const onSortChange = (sort) => {
    setFilters((prev) => ({ ...prev, sort }));
  };
  const onPageChange = (page) => {
    setFilters((prev) => ({ ...prev, page }));
  };
  return (
    <main className="container">
      <header style={{ marginBottom: "2rem" }}>
        <hgroup>
          <h1>My Books</h1>
          <p>Manage your drafts and published works</p>
        </hgroup>
      </header>

      <div className="grid">
        <nav
          style={{
            borderBottom: "1px solid var(--pico-muted-border-color)",
            marginBottom: "1rem",
          }}
        >
          <BookStatusFilter onStatusChange={onStatusChange} />
        </nav>

        <BookSortSelect onSortChange={onSortChange} />
      </div>

      <BooksTable booksData={myBooks} />

      <footer>
        {pageInfo && pageInfo.totalPages > 1 && (
          <Pagination onPageChange={onPageChange} pageInfo={pageInfo} />
        )}
      </footer>
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg("")} />}
    </main>
  );
}
