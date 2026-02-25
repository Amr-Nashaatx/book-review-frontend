export function BookSortSelect({ onSortChange }) {
  const handleChange = (e) => {
    onSortChange(e.target.value);
  };
  return (
    <fieldset>
      <label htmlFor="sort">Sort By</label>
      <select id="sort" defaultValue="lastModified" onChange={handleChange}>
        <option value="lastModified">Last Modified</option>
        <option value="title">Title</option>
        <option value="status">Status</option>
      </select>
    </fieldset>
  );
}
