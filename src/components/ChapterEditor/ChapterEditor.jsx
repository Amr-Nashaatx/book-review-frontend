import { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  Minus,
  Quote,
  Redo,
  Save,
  Strikethrough,
  Undo,
} from "lucide-react";
import {
  ActionIcon,
  Badge,
  Card,
  Group,
  Stack,
  Text,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";
import "./ChapterEditor.css";

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const groups = [
    [
      {
        label: <Undo size={16} />,
        title: "Undo",
        action: () => editor.chain().focus().undo().run(),
      },
      {
        label: <Redo size={16} />,
        title: "Redo",
        action: () => editor.chain().focus().redo().run(),
      },
    ],
    [
      {
        label: <Heading1 size={16} />,
        title: "Heading 1",
        action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        active: editor.isActive("heading", { level: 1 }),
      },
      {
        label: <Heading2 size={16} />,
        title: "Heading 2",
        action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        active: editor.isActive("heading", { level: 2 }),
      },
      {
        label: <Heading3 size={16} />,
        title: "Heading 3",
        action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        active: editor.isActive("heading", { level: 3 }),
      },
    ],
    [
      {
        label: <Bold size={16} />,
        title: "Bold",
        action: () => editor.chain().focus().toggleBold().run(),
        active: editor.isActive("bold"),
      },
      {
        label: <Italic size={16} />,
        title: "Italic",
        action: () => editor.chain().focus().toggleItalic().run(),
        active: editor.isActive("italic"),
      },
      {
        label: <Strikethrough size={16} />,
        title: "Strikethrough",
        action: () => editor.chain().focus().toggleStrike().run(),
        active: editor.isActive("strike"),
      },
    ],
    [
      {
        label: <Quote size={16} />,
        title: "Blockquote",
        action: () => editor.chain().focus().toggleBlockquote().run(),
        active: editor.isActive("blockquote"),
      },
      {
        label: <Minus size={16} />,
        title: "Divider",
        action: () => editor.chain().focus().setHorizontalRule().run(),
      },
    ],
  ];

  return (
    <Group aria-label="Editor toolbar" gap="xs" wrap="wrap" className="editor-toolbar">
      {groups.map((group, groupIndex) => (
        <Group key={groupIndex} gap="xs" className="editor-toolbar-group">
          {group.map((tool, toolIndex) => (
            <Tooltip key={`${groupIndex}-${toolIndex}`} label={tool.title}>
              <ActionIcon
                type="button"
                onClick={tool.action}
                variant={tool.active ? "filled" : "light"}
                color={tool.active ? "copper" : "gray"}
                size="lg"
              >
                {tool.label}
              </ActionIcon>
            </Tooltip>
          ))}
        </Group>
      ))}
    </Group>
  );
};

export default function ChapterEditor({ chapter, onEditChapterContent }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Typography,
      Placeholder.configure({ placeholder: "Begin your chapter here..." }),
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
  }, [editor, chapter._id, chapter.content, chapter.title]);

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
    <Card p="xl" radius="lg" className="chapter-editor-shell">
      <Stack gap="lg">
        <Group justify="space-between" align="flex-start" wrap="wrap">
          <div>
            <Title order={3} c="copper.6">
              Chapter Editor
            </Title>
            <Text c="dimmed" size="sm" mt={4}>
              Focused writing mode with live word count and chapter-level draft
              saving.
            </Text>
          </div>

          <Group gap="sm">
            <Badge variant="light" color="gray" size="lg">
              {wordCount.toLocaleString()} words
            </Badge>
            <Tooltip label={saved ? "Draft saved" : "Save draft"}>
              <ActionIcon
                size="xl"
                variant={saved ? "light" : "filled"}
                color={saved ? "moss" : "copper"}
                onClick={handleSave}
              >
                <Save size={18} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>

        <TextInput
          id="chapter-title"
          label="Chapter Title"
          placeholder="Enter chapter title..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setSaved(false);
          }}
        />

        <MenuBar editor={editor} />

        <EditorContent editor={editor} className="chapter-body" />

        <Text size="sm" c="dimmed">
          Save regularly to preserve your draft.
        </Text>
      </Stack>
    </Card>
  );
}
