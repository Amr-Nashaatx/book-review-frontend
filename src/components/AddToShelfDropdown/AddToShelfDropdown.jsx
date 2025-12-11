import { useState } from "react";
import { sendRequest } from "../../utils/sendRequest";
import NewShelfModal from "../NewShelfModal";
import Dropdown from "../Dropdown/Dropdown";
import DropdownItem from "../Dropdown/DropdownItem";
import Toast from "../Toast/Toast";
import "./AddToShelfDropdown.css";

export default function AddToShelfDropdown({ shelves, book }) {
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const onCreateShelf = async (data) => {
    try {
      const { shelf } = await sendRequest({
        url: "/shelves",
        method: "post",
        body: data,
        params: { withCredentials: true },
      });
      const newShelf = shelf;

      await sendRequest({
        url: `/shelves/${newShelf._id}/books`,
        method: "post",
        body: { bookId: book._id },
        params: { withCredentials: true },
      });

      setToastMessage(`Book added to ${newShelf.name}`);
      setShowModal(false);
    } catch (err) {
      console.error(err);
      setToastMessage("Failed to create shelf.");
    }
  };

  const handleAdd = async (shelfId) => {
    try {
      await sendRequest({
        url: `/shelves/${shelfId}/books`,
        method: "post",
        body: { bookId: book._id },
        params: { withCredentials: true },
      });
      setToastMessage(
        `Added to ${shelves.find((s) => s._id === shelfId).name}`
      );
    } catch (err) {
      console.error(err);
      setToastMessage("Failed to add book.");
    }
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <Dropdown label="Add to Shelf ▾">
        {shelves.map((shelf) => {
          const isBookInShelf = shelf.books.includes(book._id);
          return (
            <>
              <DropdownItem
                key={shelf._id}
                label={
                  isBookInShelf ? (
                    <span className="shelf-check">✓ {shelf.name}</span>
                  ) : (
                    shelf.name
                  )
                }
                handleClick={() => handleAdd(shelf._id)}
              />
            </>
          );
        })}

        <Dropdown.Divider />
        <DropdownItem
          label="+ New Shelf"
          handleClick={() => setShowModal(true)}
        />
      </Dropdown>

      {showModal && (
        <NewShelfModal
          onClose={() => setShowModal(false)}
          onCreate={onCreateShelf}
          initialBookId={book._id}
        />
      )}

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}
