import "./ChapterMenu.css";
import { useRef, useState } from "react";
import { useSortable } from "@dnd-kit/react/sortable";
import { DragDropProvider } from "@dnd-kit/react";
import {
  ActionIcon,
  Card,
  Group,
  Modal,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { LayoutPanelLeft, Plus, Trash2 } from "lucide-react";

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
      <li className="chapter-item collapsed" title={chapter.title}>
        {chapter.title.slice(0, 2)}
      </li>
    );
  }

  return (
    <li
      ref={ref}
      className={`chapter-item ${
        selectedChapterId === chapter._id ? "selected" : ""
      }`}
      onClick={() => onSelectChapter(chapter._id)}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
      }}
    >
      <Text fw={selectedChapterId === chapter._id ? 700 : 500} truncate>
        {chapter.title}
      </Text>
      <Tooltip label="Delete chapter">
        <ActionIcon
          variant="subtle"
          color="red"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteChapter(chapter._id);
          }}
        >
          <Trash2 size={16} />
        </ActionIcon>
      </Tooltip>
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
  const [chapterTitle, setChapterTitle] = useState("");
  const [isCreatingChapter, setIsCreatingChapter] = useState(false);

  const pendingOrder = useRef(null);

  const handleCloseModal = () => {
    if (isCreatingChapter) return;
    setShowModal(false);
    setChapterTitle("");
  };

  const handleCreateChapter = async (e) => {
    e.preventDefault();
    const trimmedTitle = chapterTitle.trim();
    if (!trimmedTitle || isCreatingChapter) return;

    setIsCreatingChapter(true);
    try {
      await onCreateChapter(trimmedTitle);
      setShowModal(false);
      setChapterTitle("");
    } finally {
      setIsCreatingChapter(false);
    }
  };

  return (
    <Card className="chapter-menu" p="sm" radius="lg">
      <Modal
        opened={showModal}
        onClose={handleCloseModal}
        title="Create chapter"
        centered
      >
        <form onSubmit={handleCreateChapter}>
          <Stack>
            <TextInput
              label="Chapter title"
              placeholder="Enter chapter title"
              value={chapterTitle}
              onChange={(e) => setChapterTitle(e.target.value)}
              disabled={isCreatingChapter}
              autoFocus
            />
            <Group justify="flex-end">
              <ActionIcon
                type="button"
                variant="light"
                color="gray"
                size="lg"
                disabled={isCreatingChapter}
                onClick={handleCloseModal}
              >
                x
              </ActionIcon>
              <ActionIcon
                type="submit"
                size="lg"
                variant="filled"
                color="copper"
                loading={isCreatingChapter}
                disabled={!chapterTitle.trim() || isCreatingChapter}
              >
                <Plus size={16} />
              </ActionIcon>
            </Group>
          </Stack>
        </form>
      </Modal>

      <div className="menu-header">
        <Tooltip label={isMenuOpen ? "Collapse menu" : "Expand menu"}>
          <ActionIcon variant="light" color="copper" onClick={onMenuOpen}>
            <LayoutPanelLeft size={18} />
          </ActionIcon>
        </Tooltip>
        <Text className={!isMenuOpen ? "hidden" : ""} fw={700} c="copper.6">
          Chapters
        </Text>
      </div>

      <div className="menu-content">
        <DragDropProvider
          onDragOver={(event) => {
            const { source, target } = event.operation;
            if (!target) return;

            const oldIndex = chapters.findIndex((chapter) => chapter._id === source.id);
            const newIndex = chapters.findIndex((chapter) => chapter._id === target.id);

            if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) {
              return;
            }

            const reordered = [...chapters];
            const [moved] = reordered.splice(oldIndex, 1);
            reordered.splice(newIndex, 0, moved);

            pendingOrder.current = reordered;
          }}
          onDragEnd={() => {
            if (!pendingOrder.current) return;
            onReorderChapters(pendingOrder.current);
            pendingOrder.current = null;
          }}
        >
          <ScrollArea className="chapter-menu-scroll" offsetScrollbars>
            <ul>
              {chapters?.map((chapter, idx) => (
                <Chapter
                  key={chapter._id}
                  index={idx}
                  chapter={chapter}
                  isCollapsed={!isMenuOpen}
                  onDeleteChapter={onDeleteChapter}
                  selectedChapterId={selectedChapterId}
                  onSelectChapter={onSelectChapter}
                />
              ))}
            </ul>
          </ScrollArea>
        </DragDropProvider>

        <Tooltip label="Create chapter">
          <ActionIcon
            onClick={() => setShowModal(true)}
            className="chapter-add-button"
            variant="light"
            color="copper"
            size={isMenuOpen ? "xl" : "lg"}
          >
            <Plus size={18} />
          </ActionIcon>
        </Tooltip>
      </div>
    </Card>
  );
}
