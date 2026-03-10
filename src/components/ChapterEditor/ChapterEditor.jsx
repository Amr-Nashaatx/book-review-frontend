import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import CharacterCount from "@tiptap/extension-character-count";
import { useEffect, useState } from "react";
import { Redo, Undo } from "lucide-react";
import "./ChapterEditor.css";

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const groups = [
    [
      {
        label: <Undo />,
        title: "Undo",
        action: () => editor.chain().focus().undo().run(),
      },
      {
        label: <Redo />,
        title: "Redo",
        action: () => editor.chain().focus().redo().run(),
      },
    ],
    [
      {
        label: "H1",
        title: "Heading 1",
        action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        active: editor.isActive("heading", { level: 1 }),
      },
      {
        label: "H2",
        title: "Heading 2",
        action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        active: editor.isActive("heading", { level: 2 }),
      },
      {
        label: "H3",
        title: "Heading 3",
        action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        active: editor.isActive("heading", { level: 3 }),
      },
    ],
    [
      {
        label: "B",
        title: "Bold",
        action: () => editor.chain().focus().toggleBold().run(),
        active: editor.isActive("bold"),
      },
      {
        label: "I",
        title: "Italic",
        action: () => editor.chain().focus().toggleItalic().run(),
        active: editor.isActive("italic"),
      },
      {
        label: "S",
        title: "Strikethrough",
        action: () => editor.chain().focus().toggleStrike().run(),
        active: editor.isActive("strike"),
      },
    ],
    [
      {
        label: "❝",
        title: "Blockquote",
        action: () => editor.chain().focus().toggleBlockquote().run(),
        active: editor.isActive("blockquote"),
      },
      {
        label: "—",
        title: "Divider",
        action: () => editor.chain().focus().setHorizontalRule().run(),
      },
    ],
  ];

  return (
    <nav aria-label="Editor toolbar">
      <ul>
        {groups.map((group, gi) =>
          group.map((tool, i) => (
            <li key={`${gi}-${i}`}>
              <button
                onClick={tool.action}
                title={tool.title}
                className={tool.active ? "secondary" : "outline secondary"}
              >
                {tool.label}
              </button>
            </li>
          )),
        )}
      </ul>
    </nav>
  );
};

export default function ChapterEditor({ chapter, onEditChapterContent }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Typography,
      Placeholder.configure({ placeholder: "Begin your chapter here…" }),
      CharacterCount,
    ],
    onUpdate: () => {
      setSaved(false);
      setWordCount(editor?.storage.characterCount.words());
    },
  });
  const [title, setTitle] = useState(chapter.title);
  const [saved, setSaved] = useState(false);
  const [wordCount, setWordCount] = useState(
    editor?.storage.characterCount.words() ?? 0,
  );

  useEffect(() => {
    if (!editor) return;

    editor.commands.setContent(
      chapter.content ? JSON.parse(chapter.content) : "",
    );

    setTitle(chapter.title);

    setSaved(false);
  }, [editor, chapter._id]);

  const handleSave = () => {
    const payload = {
      title,
      content: JSON.stringify(editor.getJSON()),
      wordCount,
    };
    onEditChapterContent(chapter._id, payload);
    setSaved(true);
  };

  return (
    <>
      <main className="container">
        <header>
          <hgroup>
            <h2>Chapter Editor</h2>
            <p>{wordCount.toLocaleString()} words</p>
          </hgroup>
          <button
            onClick={handleSave}
            className={saved ? "secondary" : "primary"}
          >
            {saved ? "✓ Saved" : "Save Draft"}
          </button>
        </header>

        <article>
          <label htmlFor="chapter-title">
            Chapter Title
            <input
              id="chapter-title"
              type="text"
              placeholder="Enter chapter title…"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setSaved(false);
              }}
            />
          </label>

          <MenuBar editor={editor} />

          <EditorContent editor={editor} className="chapter-body" />
        </article>

        <footer>
          <small>Save regularly to preserve your draft.</small>
        </footer>
      </main>
    </>
  );
}
