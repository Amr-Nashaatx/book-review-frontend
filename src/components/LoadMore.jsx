export default function LoadMore({ hasNextPage, onLoadMore, isLoading }) {
  if (!hasNextPage) return null;
  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <button variant="primary" disabled={isLoading} onClick={onLoadMore}>
        {isLoading ? "Loading..." : "Load More ..."}
      </button>
    </div>
  );
}
