import { useState } from "react";

export default function Modal({ open, onCancel, onSubmit }) {
  const [title, setTitle] = useState("");
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(title);
  };
  return (
    <dialog open={open} onClick={handleBackdropClick}>
      <article>
        <h2 style={{ padding: "0.5rem" }}>Add New Chapter</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="actions">
            <button style={{ marginRight: "0.3rem" }}>Confirm</button>
            <button className="secondary" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </article>
    </dialog>
  );
}
