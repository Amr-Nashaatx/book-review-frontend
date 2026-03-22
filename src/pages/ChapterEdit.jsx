import { useEffect, useState } from "react";
import ChapterEditor from "../components/ChapterEditor/ChapterEditor";
import ChaptersMenu from "../components/ChaptersMenu/ChaptersMenu";
import ComponentErrorBoundary from "../components/ComponentErrorBoundary";
import { useFetchChapters } from "../hooks/useFetchChapters";
import { useNavigate, useParams } from "react-router-dom";
import { sendRequest } from "../utils/sendRequest";

export default function ChapterEdit() {
  const params = useParams();
  const navigate = useNavigate();
  const bookId = params.id;

  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const { fetchChapters, chapters, setChapters } = useFetchChapters();
  const [selectedChapterId, setSelectedChapterId] = useState("");

  useEffect(() => {
    async function fetchInitialChapters() {
      // if no chapter create default one
      const fetchedChapters = await fetchChapters(bookId);
      if (!fetchedChapters.length) {
        try {
          const { chapter } = await sendRequest({
            url: `/books/${bookId}/chapters`,
            method: "post",
            body: { title: "New" },
          });

          setChapters([chapter]);
        } catch (error) {
          console.error(error);
          navigate("/author/my-books");
        }
      }
    }

    fetchInitialChapters();
  }, []);
  useEffect(() => {
    if (chapters.length > 0 && !selectedChapterId) {
      setSelectedChapterId(chapters[0]._id);
    }
  }, [chapters]);

  const selectedChapter = chapters.find((ch) => ch._id === selectedChapterId);

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
  };

  const handleDeleteChapter = async (chapterId) => {
    try {
      await sendRequest({
        url: `/books/${bookId}/chapters/${chapterId}`,
        method: "delete",
      });
    } catch (error) {
      console.log(error);
      return;
    }
    setChapters((existingChapters) =>
      existingChapters.filter((ch) => ch._id !== chapterId),
    );
  };

  const handleReorderChapters = async (orderedChapters) => {
    const beforeReorder = chapters;
    setChapters(orderedChapters);
    try {
      await sendRequest({
        url: `/books/${bookId}/chapters/reorder`,
        method: "put",
        body: { chapters: orderedChapters.map((ch) => ch._id) },
      });
    } catch (error) {
      console.log(error);
      setChapters(beforeReorder);
      return;
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
    } catch (error) {
      console.log(error);
      setChapters(chaptersBeforeUpdate);
      return;
    }
  };
  return (
    <div className={`chapter-edit ${!isMenuOpen ? "menu-collapse" : ""}`}>
      {selectedChapter && (
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
      )}
      {selectedChapter && (
        <ComponentErrorBoundary
          componentName="Chapter editor"
          resetKeys={[selectedChapterId]}
          className="chapter-editor-boundary"
          title="The editor hit an unexpected problem."
          message="Switch chapters or retry to reload the editor while keeping the menu available."
        >
          <ChapterEditor
            onEditChapterContent={handleUpdateChapterContent}
            chapter={selectedChapter}
          />
        </ComponentErrorBoundary>
      )}
    </div>
  );
}
