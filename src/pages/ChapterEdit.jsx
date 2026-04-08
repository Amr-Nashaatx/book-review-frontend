import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Group, Loader, Stack, Text, Title } from "@mantine/core";
import ChapterEditor from "../components/ChapterEditor/ChapterEditor";
import ChaptersMenu from "../components/ChaptersMenu/ChaptersMenu";
import ComponentErrorBoundary from "../components/ComponentErrorBoundary/ComponentErrorBoundary";
import { useFetchChapters } from "../hooks/useFetchChapters";
import { sendRequest } from "../utils/sendRequest";

function ChapterEditorPlaceholder({ isCreatingDefaultChapter }) {
  return (
    <Card p="xl" radius="lg">
      <Stack gap="xs">
        <Title order={3} c="copper.6">
          Chapter Editor
        </Title>
        <Text c="dimmed">
          {isCreatingDefaultChapter
            ? "Creating your first chapter..."
            : "Select a chapter or create a new one to start writing."}
        </Text>
      </Stack>
    </Card>
  );
}

export default function ChapterEdit() {
  const params = useParams();
  const navigate = useNavigate();
  const bookId = params.id;

  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const { fetchChapters, chapters, setChapters, isLoading, error } =
    useFetchChapters();
  const [selectedChapterId, setSelectedChapterId] = useState("");
  const [isCreatingDefaultChapter, setIsCreatingDefaultChapter] =
    useState(false);

  useEffect(() => {
    async function fetchInitialChapters() {
      const fetchedChapters = await fetchChapters(bookId);

      if (!fetchedChapters.length) {
        setIsCreatingDefaultChapter(true);
        try {
          const { chapter } = await sendRequest({
            url: `/books/${bookId}/chapters`,
            method: "post",
            body: { title: "New" },
          });

          setChapters([chapter]);
          setSelectedChapterId(chapter._id);
        } catch (fetchError) {
          console.error(fetchError);
          navigate("/author/my-books");
        } finally {
          setIsCreatingDefaultChapter(false);
        }
      }
    }

    fetchInitialChapters();
  }, [bookId, fetchChapters, navigate, setChapters]);

  useEffect(() => {
    if (!chapters.length) {
      setSelectedChapterId("");
      return;
    }

    const hasSelectedChapter = chapters.some(
      (chapter) => chapter._id === selectedChapterId,
    );
    if (!hasSelectedChapter) {
      setSelectedChapterId(chapters[0]._id);
    }
  }, [chapters, selectedChapterId]);

  const selectedChapter = chapters.find(
    (chapter) => chapter._id === selectedChapterId,
  );

  const handleSelectChapter = (chapterId) => {
    setSelectedChapterId(chapterId);
  };

  const handleCreateChapter = async (title) => {
    const { chapter } = await sendRequest({
      url: `/books/${bookId}/chapters`,
      method: "post",
      body: { title },
    });
    setChapters((existingChapters) => [...existingChapters, chapter]);
    setSelectedChapterId(chapter._id);
  };

  const handleDeleteChapter = async (chapterId) => {
    try {
      await sendRequest({
        url: `/books/${bookId}/chapters/${chapterId}`,
        method: "delete",
      });
    } catch (deleteError) {
      console.log(deleteError);
      return;
    }
    setChapters((existingChapters) =>
      existingChapters.filter((chapter) => chapter._id !== chapterId),
    );
  };

  const handleReorderChapters = async (orderedChapters) => {
    const beforeReorder = chapters;
    setChapters(orderedChapters);
    try {
      await sendRequest({
        url: `/books/${bookId}/chapters/reorder`,
        method: "put",
        body: { chapters: orderedChapters.map((chapter) => chapter._id) },
      });
    } catch (reorderError) {
      console.log(reorderError);
      setChapters(beforeReorder);
    }
  };

  const handleUpdateChapterContent = async (chapterId, chapter) => {
    const chaptersBeforeUpdate = chapters;
    setChapters((prevChapters) => {
      const newChapters = prevChapters.slice();
      const updatedChapter = prevChapters.find((ch) => ch._id === chapterId);
      const updatedChapterIdx = prevChapters.findIndex(
        (ch) => ch._id === chapterId,
      );

      updatedChapter.content = chapter.content;
      updatedChapter.title = chapter.title;

      newChapters.splice(updatedChapterIdx, 1, updatedChapter);
      return newChapters;
    });
    try {
      await sendRequest({
        url: `/books/${bookId}/chapters/${chapterId}`,
        method: "put",
        body: { ...chapter },
      });
    } catch (updateError) {
      console.log(updateError);
      setChapters(chaptersBeforeUpdate);
    }
  };

  if (isLoading && !chapters.length && !isCreatingDefaultChapter) {
    return (
      <Card p="xl">
        <Group justify="center" py="xl">
          <Loader color="copper.6" />
          <Text c="dimmed">Loading chapters...</Text>
        </Group>
      </Card>
    );
  }

  if (error && !chapters.length) {
    return (
      <Card p="xl">
        <Stack gap="xs">
          <Title order={3} c="brick.6">
            Unable to load the chapter workspace
          </Title>
          <Text c="dimmed">{error}</Text>
        </Stack>
      </Card>
    );
  }

  return (
    <Stack gap="md" className="chapter-edit-page">
      <div>
        <Title order={2} c="copper.6" fz={34}>
          Chapter Workspace
        </Title>
        <Text c="dimmed" mt={6}>
          Keep your chapter list close, write in the center, and move between
          drafts without leaving the workspace.
        </Text>
      </div>
      <div className={`chapter-edit ${!isMenuOpen ? "menu-collapse" : ""}`}>
        <ComponentErrorBoundary
          componentName="Chapters menu"
          resetKeys={[isMenuOpen, chapters.length, selectedChapterId]}
          className="chapter-menu-boundary"
          title="The chapters list ran into a problem."
          message="Retry to remount the menu without interrupting the editor."
        >
          <ChaptersMenu
            isMenuOpen={isMenuOpen}
            chapters={chapters}
            selectedChapterId={selectedChapterId}
            onDeleteChapter={handleDeleteChapter}
            onCreateChapter={handleCreateChapter}
            onReorderChapters={handleReorderChapters}
            onSelectChapter={handleSelectChapter}
            onMenuOpen={() => setIsMenuOpen((prev) => !prev)}
          />
        </ComponentErrorBoundary>
        <ComponentErrorBoundary
          componentName="Chapter editor"
          resetKeys={[selectedChapterId, isCreatingDefaultChapter]}
          className="chapter-editor-boundary"
          title="The editor hit an unexpected problem."
          message="Switch chapters or retry to reload the editor while keeping the menu available."
        >
          {selectedChapter ? (
            <ChapterEditor
              onEditChapterContent={handleUpdateChapterContent}
              chapter={selectedChapter}
            />
          ) : (
            <ChapterEditorPlaceholder
              isCreatingDefaultChapter={isCreatingDefaultChapter}
            />
          )}
        </ComponentErrorBoundary>
      </div>
    </Stack>
  );
}
