import { Button, Group, Text, Textarea, TextInput } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { Pencil } from "lucide-react";

export default function EditableField({
  value,
  onSave,
  type = "text",
  style,
  ...props
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);
  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const handleSave = async () => {
    await onSave(currentValue);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div style={{ width: "100%" }}>
        {type === "textarea" ? (
          <Textarea
            ref={inputRef}
            value={currentValue}
            size="xl"
            onChange={(e) => setCurrentValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSave()}
          />
        ) : (
          <TextInput
            ref={inputRef}
            type="text"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            style={{ margin: 0, display: "inline-block" }}
          />
        )}
        <Group mt={12}>
          <Button
            className="outline"
            onClick={handleSave}
            style={{ padding: "2px 10px", width: "auto" }}
          >
            Save
          </Button>
          <Button
            className="outline secondary"
            onClick={() => setIsEditing(false)}
            variant="outline"
          >
            Cancel
          </Button>
        </Group>
      </div>
    );
  }

  return (
    <Text
      onClick={() => setIsEditing(true)}
      ml={"md"}
      style={{
        cursor: "pointer",
        borderBottom: "1px dashed var(--mantine-color-copper-7)",
        display: "inline-block",
        ...style,
      }}
      {...props}
    >
      {value}
      <Pencil size={16} style={{ marginLeft: ".3rem" }} />
    </Text>
  );
}
