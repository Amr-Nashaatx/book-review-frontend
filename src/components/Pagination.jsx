export default function Pagination({ pageInfo, onPageChange }) {
  const { page, totalPages, hasNextPage, hasPrevPage } = pageInfo;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="pagination">
      <ul style={{ justifyContent: "center" }}>
        <li>
          <button
            className="outline secondary"
            onClick={() => onPageChange(page - 1)}
            disabled={!hasPrevPage}
            style={{ marginBottom: 0 }}
          >
            Previous
          </button>
        </li>

        {pages.map((p) => (
          <li key={p}>
            <button
              className={p === page ? "" : "outline secondary"}
              onClick={() => onPageChange(p)}
              style={{ marginBottom: 0, width: "45px" }}
            >
              {p}
            </button>
          </li>
        ))}

        <li>
          <button
            className="outline secondary"
            onClick={() => onPageChange(page + 1)}
            disabled={!hasNextPage}
            style={{ marginBottom: 0 }}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
