import { useState } from "react";

export default function NewShelfModal({ onClose, onCreate }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [closing, setClosing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ name, description });
  };

  const closeWithAnimation = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 250); // this should match the CSS animation duration
  };

  return (
    <dialog open className={closing ? "closing" : ""}>
      <article>
        <header style={{ padding: "2rem" }}>
          <h3>Create New Shelf</h3>
        </header>

        <form onSubmit={handleSubmit}>
          <label>
            Shelf Name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label>
            Description (optional)
            <textarea
              value={description}
              style={{ resize: "none" }}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <footer
            style={{ display: "flex", justifyContent: "end", gap: "1rem" }}
          >
            <button
              type="button"
              className="secondary"
              onClick={closeWithAnimation}
            >
              Cancel
            </button>
            <button type="submit" className="primary">
              Create Shelf
            </button>
          </footer>
        </form>
      </article>
    </dialog>
  );
}
