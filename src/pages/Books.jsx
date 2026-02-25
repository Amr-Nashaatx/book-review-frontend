import Error from "../components/Error";
import BookList from "../components/BookList";
import BookFilters from "../components/BookFilters";
import Toast from "../components/Toast/Toast";

import { useEffect, useRef, useState } from "react";
import { useBooksStore } from "../stores/booksStore";
import { useSearchParams } from "react-router-dom";
import { sendRequest } from "../utils/sendRequest";
import { useNavigate } from "react-router-dom";
import LoadMore from "../components/LoadMore";

export default function Books() {
  //detect selection mode
  const [params] = useSearchParams();
  const addToShelfId = params.get("addToShelf");
  const selectionMode = Boolean(addToShelfId);
  // toast
  const [toastMessage, setToastMessage] = useState("");
  // state
  const booksData = useBooksStore((s) => s.booksData);
  const isLoading = useBooksStore((s) => s.isLoading);
  const error = useBooksStore((s) => s.error);

  //actions
  const fetchBooks = useBooksStore((s) => s.fetchBooks);
  const loadMore = useBooksStore((s) => s.loadMore);
  const getGenres = useBooksStore((s) => s.getGenres);

  const [isFirstPage, setIsFirstPage] = useState(true);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    getGenres();
  }, [getGenres]);

  useEffect(() => {
    // fetch only when there's zero cached books
    if (!booksData?.books?.length) {
      fetchBooks().catch(() => {});
    }
  }, [fetchBooks, booksData?.books?.length]);

  const onApplyFilters = async (pendingFilters) => {
    setIsFirstPage(true);
    await fetchBooks(pendingFilters);
  };

  const onAddBookToShelf = async (bookId) => {
    try {
      await sendRequest({
        url: `/shelves/${addToShelfId}/books`,
        method: "post",
        body: { bookId },
        params: { withCredentials: true },
      });
      setToastMessage("Book added to shelf.");
      navigate(`/shelves/${addToShelfId}`);
    } catch (error) {
      console.log(error);
      setToastMessage("Failed to add book.");
    }
  };

  const onLoadMore = async () => {
    setIsFirstPage(false);
    let anchorY;
    if (containerRef.current) {
      const children = containerRef.current.children;
      if (children.length > 0) {
        const last = children[children.length - 1];
        anchorY = last.getBoundingClientRect().top + window.scrollY;
      }
      try {
        await loadMore();
      } catch (error) {
        console.error("Failed to load more books.", error);
      }
      if (anchorY) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            window.scrollTo({
              top: Math.max(anchorY - 100, 0),
              behavior: "smooth",
            });
          });
        });
      }
    }
  };

  return (
    <article style={{ padding: "4rem" }}>
      <header style={{ padding: "2rem" }}>
        <h2>Books</h2>
      </header>

      <BookFilters onApplyFilters={onApplyFilters} />

      <div ref={containerRef}>
        {isLoading && isFirstPage ? (
          <p>Loading books...</p>
        ) : (
          <BookList
            books={booksData?.books || []}
            selectionMode={selectionMode}
            onAddBookToShelf={onAddBookToShelf}
          />
        )}

        <LoadMore
          hasNextPage={!!booksData?.pageInfo?.nextCursor}
          isLoading={isLoading}
          onLoadMore={onLoadMore}
        />
      </div>
      {toastMessage && <Toast message={toastMessage} />}
      {error && <Error message={error} />}
    </article>
  );
}
