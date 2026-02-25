import { Edit3, Eye, Send, Trash2 } from "lucide-react";

const iconBtnStyle = {
  padding: "6px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "36px",
  height: "36px",
  marginBottom: 0, // Prevents Pico's default button margin
};

export default function BooksTableRow({ bookData }) {
  return (
    <tr>
      <td>
        <strong>{bookData.title}</strong>
      </td>
      <td>
        <mark
          style={{
            backgroundColor: "var(--pico-ins-color)",
            color: "white",
            borderRadius: "4px",
            padding: "2px 8px",
          }}
        >
          <small>{bookData.status}</small>
        </mark>
      </td>
      <td className="text-center">24</td>
      <td>
        <small>{new Date(bookData.updatedAt).toLocaleDateString()}</small>
      </td>
      <td style={{ textAlign: "right" }}>
        <div style={{ display: "inline-flex", gap: "0.25rem" }}>
          <button
            className="outline secondary"
            style={iconBtnStyle}
            title="View Book"
          >
            <Eye size={16} strokeWidth={2.5} />
          </button>

          <button
            className="outline"
            style={iconBtnStyle}
            title="Edit Chapters"
          >
            <Edit3 size={16} strokeWidth={2.5} />
          </button>

          <button
            className="contrast"
            style={iconBtnStyle}
            title="Publish to Store"
          >
            <Send size={16} strokeWidth={2.5} />
          </button>

          <button
            className="outline secondary"
            style={{
              ...iconBtnStyle,
              borderColor: "var(--pico-form-element-invalid-border-color)",
              color: "var(--pico-form-element-invalid-border-color)",
            }}
            title="Delete Draft"
          >
            <Trash2 size={16} strokeWidth={2.5} />
          </button>
        </div>
      </td>
    </tr>
  );
}
