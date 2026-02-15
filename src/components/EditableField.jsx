import { useEffect, useRef, useState } from "react";

export default function EditableField({ value, onSave, type = "text" }) {
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
          <textarea
            ref={inputRef}
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSave()}
            style={{ marginBottom: "0.5rem" }}
          />
        ) : (
          <input
            ref={inputRef}
            type="text"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            style={{ margin: 0, display: "inline-block" }}
          />
        )}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            className="outline"
            onClick={handleSave}
            style={{ padding: "2px 10px", width: "auto" }}
          >
            Save
          </button>
          <button
            className="outline secondary"
            onClick={() => setIsEditing(false)}
            style={{ padding: "2px 10px", width: "auto" }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <span
      onClick={() => setIsEditing(true)}
      style={{
        cursor: "pointer",
        borderBottom: "1px dashed var(--pico-muted-color)",
        display: "inline-block",
      }}
    >
      {value}
      <small style={{ marginLeft: "10px", opacity: 0.6 }}>✎</small>
    </span>
  );
}
