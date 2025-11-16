import { useState } from "react";
import { capitalizeFirst } from "../utils/strings";
import CustomSelect from "./CustomSelect";
import { useBooksStore } from "../stores/booksStore";

export default function BookFilters({ onApplyFilters }) {
  const [collapsed, setCollapsed] = useState(true);

  const filters = useBooksStore((s) => s.filters);
  const setFilters = useBooksStore((s) => s.setFilters);
  const genres = useBooksStore((s) => s.genres);
  const clearFilters = useBooksStore((s) => s.clearFilters);
  // build react-select options once genres are loaded
  const options = genres
    ? genres.map((genre) => ({
        value: genre,
        label: capitalizeFirst(genre),
      }))
    : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onApplyFilters(filters);
  };
  const styles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    maxWidth: "1000px",
    margin: "0 auto",
    width: "100%",
  };
  if (collapsed) styles.alignItems = "center";
  if (!collapsed) delete styles.alignItems;
  return (
    <form onSubmit={handleSubmit} style={styles}>
      <button
        type="button"
        onClick={() => setCollapsed((prev) => !prev)}
        style={{
          marginBottom: "1rem",
          width: "200px",
        }}
      >
        {collapsed ? "Show Filters" : "Hide Filters"}
      </button>
      {!collapsed && (
        <>
          {options.length && (
            <CustomSelect
              options={options}
              value={options.filter((opt) => filters.genre.includes(opt.value))}
              onChange={(selected) => {
                setFilters({
                  genre: selected ? selected.map((opt) => opt.value) : [],
                });
              }}
            />
          )}

          <div
            className="filters"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
              marginTop: "2rem",
            }}
          >
            <input
              type="text"
              placeholder="Author"
              value={filters.author}
              onChange={(e) => setFilters({ author: e.target.value })}
            />
            <select
              value={filters.rating}
              onChange={(e) => setFilters({ rating: e.target.value })}
            >
              <option value="">Rating</option>
              {Array.from({ length: 5 }, (_, i) => i + 1).map((idx) => (
                <option key={idx} value={idx}>
                  +{idx}
                </option>
              ))}
            </select>

            <select
              value={filters.sort}
              onChange={(e) => setFilters({ sort: e.target.value })}
            >
              <option value="">Sort By</option>
              <option value="title">Title (A–Z)</option>
              <option value="-averageRating">Rating (High → Low)</option>
              <option value="-publishedYear">Newest First</option>
            </select>
          </div>
          <div
            className="grid"
            style={{
              marginTop: "2rem",
              gap: "1rem",
            }}
          >
            <button
              className="outline"
              type="button"
              onClick={() => clearFilters()}
            >
              Clear Filters
            </button>

            <button type="submit">Apply Filters</button>
          </div>
        </>
      )}
    </form>
  );
}
