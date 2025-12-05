import { Link } from "react-router-dom";
import "./Shelf.css";
import AnimatedListItem from "../AnimatedListItem";

export default function Shelf({
  shelf,
  handleRemoveShelf,
  isRemoving,
  isCollapsing,
}) {
  return (
    <AnimatedListItem
      key={shelf._id}
      className="shelf-card"
      isRemoving={isRemoving}
      isCollapsing={isCollapsing}
    >
      <div>
        <strong>{shelf.name} </strong>
        <small>({shelf.booksCount})</small>
      </div>
      <div className="shelf-actions">
        <Link to={`/shelves/${shelf._id}`} className="shelf-link">
          View
        </Link>
        <Link to={`/shelves/${shelf._id}/edit`} className="shelf-link">
          Edit
        </Link>
        <button
          className="outline secondary"
          disabled={isRemoving}
          onClick={() => handleRemoveShelf(shelf._id)}
        >
          {isRemoving ? "Removing..." : "Remove"}
        </button>
      </div>
    </AnimatedListItem>
  );
}
