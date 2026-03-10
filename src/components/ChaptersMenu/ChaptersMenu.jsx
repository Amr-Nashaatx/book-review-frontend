import "./ChapterMenu.css";
import { MenuIcon } from "lucide-react";
import { Plus, TrashIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useSortable } from "@dnd-kit/react/sortable";
import { DragDropProvider } from "@dnd-kit/react";
import Modal from "../Modal";

const Chapter = ({
  chapter,
  isCollapsed,
  onDeleteChapter,
  index,
  onSelectChapter,
  selectedChapterId,
}) => {
  const { ref, isDragging } = useSortable({
    id: chapter._id,
    index,
  });

  if (isCollapsed) {
    return (
      <li className="chapter-item collapsed">
        {chapter.title.substr(0, 2) + ".."}
      </li>
    );
  }

  return (
    <li
      ref={ref}
      className={`chapter-item ${selectedChapterId === chapter._id ? "selected" : ""}`}
      onClick={() => onSelectChapter(chapter._id)}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
      }}
    >
      <span style={{ flex: 1 }}>{chapter.title}</span>
      <button
        className="secondary outline"
        style={{ padding: 0, border: "none", marginRight: ".3rem" }}
        onClick={(e) => {
          e.stopPropagation();
          onDeleteChapter(chapter._id);
        }}
      >
        <TrashIcon />
      </button>
    </li>
  );
};

export default function ChaptersMenu({
  isMenuOpen,
  onMenuOpen,
  chapters,
  onSelectChapter,
  onCreateChapter,
  onDeleteChapter,
  onReorderChapters,
  selectedChapterId,
}) {
  const [showModal, setShowModal] = useState(false);

  const handleAddChapter = () => {
    setShowModal(true);
  };
  const onModalSubmit = (chapterTitle) => {
    setShowModal(false);
    onCreateChapter(chapterTitle);
  };

  const pendingOrder = useRef(null);
  return (
    <div className="chapter-menu">
      <Modal
        open={showModal}
        onCancel={() => setShowModal(() => false)}
        onSubmit={onModalSubmit}
      />
      <div className="menu-header">
        <button className="outline secondary" onClick={() => onMenuOpen()}>
          <MenuIcon
            size={32}
            strokeWidth={"1"}
            style={{ paddingRight: "0.2rem" }}
          />
        </button>
        <h3 className={!isMenuOpen ? "hidden" : ""}>Chapters</h3>
      </div>
      <div className={`menu-content`}>
        <hr />
        <DragDropProvider
          onDragOver={(event) => {
            const { source, target } = event.operation;
            if (!target) return;

            const oldIndex = chapters.findIndex((ch) => ch._id === source.id);
            const newIndex = chapters.findIndex((ch) => ch._id === target.id);

            if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex)
              return;

            const reordered = [...chapters];
            const [moved] = reordered.splice(oldIndex, 1);
            reordered.splice(newIndex, 0, moved);

            console.log(reordered);

            pendingOrder.current = reordered;
          }}
          onDragEnd={() => {
            if (!pendingOrder.current) return;
            onReorderChapters(pendingOrder.current);
            pendingOrder.current = null;
          }}
        >
          <ul>
            {chapters.map((ch, idx) => (
              <Chapter
                key={ch._id}
                index={idx}
                chapter={ch}
                isCollapsed={!isMenuOpen}
                onDeleteChapter={onDeleteChapter}
                selectedChapterId={selectedChapterId}
                onSelectChapter={onSelectChapter}
              />
            ))}
          </ul>
        </DragDropProvider>
        <div
          onClick={handleAddChapter}
          className="chapter-item"
          style={{
            padding: "0.5rem 0.2rem",
            marginTop: "1rem",
            border: "1px solid #232b3a",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "5px",
          }}
        >
          <Plus />
        </div>
      </div>
    </div>
  );
}
