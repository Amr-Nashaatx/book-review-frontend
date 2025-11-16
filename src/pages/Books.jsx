import Error from "../components/Error";
import BookList from "../components/BookList";
import Pagination from "../components/Pagination";
import { useEffect, useRef, useState } from "react";
import BookFilters from "../components/BookFilters";
import { useBooksStore } from "../stores/booksStore";

export default function Books() {
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

  useEffect(() => {
    getGenres();
  }, [getGenres]);

  useEffect(() => {
    // fetch only when there's zero cached books
    if (!booksData?.books?.length) {
      fetchBooks().catch(() => {});
    }
  }, [fetchBooks]);

  const onApplyFilters = async (pendingFilters) => {
    setIsFirstPage(true);
    await fetchBooks(pendingFilters);
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
      } catch (err) {}
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
          <BookList books={booksData?.books || []} />
        )}

        <Pagination
          hasNextPage={!!booksData?.pageInfo?.nextCursor}
          isLoading={isLoading}
          onLoadMore={onLoadMore}
        />
      </div>

      {error && <Error message={error} />}
    </article>
  );
}
