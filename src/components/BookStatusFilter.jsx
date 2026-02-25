import { useState } from "react";

export default function BookStatusFilter({ onStatusChange }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const handleStatusChange = (e) => {
    const status = e.target.id.toLowerCase();
    onStatusChange(status);
  };
  return (
    <ul style={{ marginBottom: 0 }} onClickCapture={handleStatusChange}>
      <li>
        <a
          role="button"
          id="all"
          className={activeFilter === "all" ? `outline` : `secondary outline`}
          onClick={() => setActiveFilter("")}
        >
          All
        </a>
      </li>
      <li>
        <a
          role="button"
          id="draft"
          className={activeFilter === "draft" ? `outline` : `secondary outline`}
          onClick={() => setActiveFilter("draft")}
        >
          Draft
        </a>
      </li>
      <li>
        <a
          role="button"
          id="published"
          className={
            activeFilter === "published" ? `outline` : `secondary outline`
          }
          onClick={() => setActiveFilter("published")}
        >
          Published
        </a>
      </li>
      <li>
        <a
          role="button"
          id="archived"
          className={
            activeFilter === "archived" ? `outline` : `secondary outline`
          }
          onClick={() => setActiveFilter("archived")}
        >
          Archived
        </a>
      </li>
    </ul>
  );
}
