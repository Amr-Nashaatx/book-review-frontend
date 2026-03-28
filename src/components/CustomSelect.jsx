import Select from "react-select";

const customStyles = {
  control: (base, state) => ({
    ...base,
    background: "var(--app-surface-bg)",
    borderColor: state.isFocused
      ? "var(--mantine-color-copper-5)"
      : "var(--app-surface-border)",
    color: "var(--mantine-color-text)",
    boxShadow: "none",
    borderRadius: "var(--mantine-radius-md)",
    minHeight: "44px",
    transition:
      "background-color 180ms ease, border-color 180ms ease, box-shadow 180ms ease",
    "&:hover": {
      borderColor: state.isFocused
        ? "var(--mantine-color-copper-5)"
        : "var(--mantine-color-copper-3)",
    },
    ...(state.isFocused
      ? {
          boxShadow:
            "0 0 0 1px var(--mantine-color-copper-4), 0 8px 24px rgba(197, 106, 52, 0.12)",
        }
      : {}),
  }),

  menu: (base) => ({
    ...base,
    background: "var(--app-surface-bg)",
    border: "1px solid var(--app-surface-border)",
    borderRadius: "calc(var(--mantine-radius-md) + 2px)",
    boxShadow: "var(--app-surface-shadow)",
    overflow: "hidden",
    marginTop: "6px",
  }),

  menuList: (base) => ({
    ...base,
    padding: "0.4rem",
  }),

  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "var(--mantine-color-copper-6)"
      : state.isFocused
        ? "color-mix(in srgb, var(--mantine-color-copper-0) 70%, white 30%)"
        : "transparent",
    color: state.isSelected
      ? "white"
      : state.isFocused
        ? "var(--mantine-color-copper-8)"
        : "var(--mantine-color-text)",
    cursor: "pointer",
    borderRadius: "calc(var(--mantine-radius-sm) + 2px)",
    fontWeight: state.isSelected ? 600 : 500,
    transition: "background-color 140ms ease, color 140ms ease",
    ":active": {
      backgroundColor: "var(--mantine-color-copper-5)",
      color: "white",
    },
  }),

  multiValue: (base) => ({
    ...base,
    background:
      "color-mix(in srgb, var(--mantine-color-copper-1) 78%, white 22%)",
    border:
      "1px solid color-mix(in srgb, var(--mantine-color-copper-3) 72%, white 28%)",
    borderRadius: "999px",
    paddingInlineStart: "0.15rem",
  }),

  multiValueLabel: (base) => ({
    ...base,
    color: "var(--mantine-color-copper-8)",
    fontWeight: 600,
  }),

  multiValueRemove: (base) => ({
    ...base,
    color: "var(--mantine-color-copper-7)",
    borderRadius: "999px",
    ":hover": {
      backgroundColor: "var(--mantine-color-copper-6)",
      color: "#fff",
    },
  }),

  placeholder: (base) => ({
    ...base,
    color: "var(--app-surface-muted-text)",
  }),

  singleValue: (base) => ({
    ...base,
    color: "var(--mantine-color-text)",
  }),

  input: (base) => ({
    ...base,
    color: "var(--mantine-color-text)",
  }),

  valueContainer: (base) => ({
    ...base,
    gap: "0.3rem",
    padding: "0.35rem 0.5rem",
  }),

  clearIndicator: (base) => ({
    ...base,
    color: "var(--app-surface-muted-text)",
    ":hover": {
      color: "var(--mantine-color-copper-7)",
    },
  }),

  dropdownIndicator: (base, state) => ({
    ...base,
    color: state.isFocused
      ? "var(--mantine-color-copper-6)"
      : "var(--app-surface-muted-text)",
    ":hover": {
      color: "var(--mantine-color-copper-7)",
    },
  }),

  indicatorSeparator: (base) => ({
    ...base,
    backgroundColor: "var(--app-divider-color)",
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
      placeholder="Genres"
    />
  );
}
