import Select from "react-select";

const customStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "#1b1d1f", // dark base background
    borderColor: state.isFocused ? "#3b82f6" : "#2a2c2f", // soft blue border when focused
    color: "#e0e0e0",
    boxShadow: "none",
    borderRadius: "8px",
    minHeight: "40px",
    "&:hover": {
      borderColor: "#3b82f6",
    },
  }),

  menu: (base) => ({
    ...base,
    backgroundColor: "#222426",
    border: "1px solid #2f3134",
    borderRadius: "8px",
    marginTop: "4px",
  }),

  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#3b82f6" // selected blue accent
      : state.isFocused
      ? "#2a2c2f" // subtle hover
      : "#222426",
    color: state.isSelected ? "#ffffff" : "#e0e0e0",
    cursor: "pointer",
  }),

  multiValue: (base) => ({
    ...base,
    backgroundColor: "#3b82f6", // chip background
    borderRadius: "6px",
  }),

  multiValueLabel: (base) => ({
    ...base,
    color: "#fff",
    fontWeight: 500,
  }),

  multiValueRemove: (base) => ({
    ...base,
    color: "#fff",
    ":hover": {
      backgroundColor: "#2563eb",
      color: "#fff",
    },
  }),

  placeholder: (base) => ({
    ...base,
    color: "#9ca3af", // muted gray placeholder
  }),

  singleValue: (base) => ({
    ...base,
    color: "#f3f4f6", // bright text for selected item
  }),

  input: (base) => ({
    ...base,
    color: "#f3f4f6", // text color when typing
  }),
};

export default function CustomSelect({ value, options, onChange }) {
  return (
    <Select
      isMulti
      isSearchable={false}
      options={options}
      value={value}
      styles={customStyles}
      onChange={onChange}
    />
  );
}
