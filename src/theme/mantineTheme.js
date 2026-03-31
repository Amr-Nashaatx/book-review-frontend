import { Button, Card, Menu, Paper, createTheme } from "@mantine/core";

const surfaceStyles = {
  root: {
    background: "var(--app-surface-bg)",
    borderColor: "var(--app-surface-border)",
    boxShadow: "var(--app-surface-shadow)",
    color: "var(--mantine-color-text)",
    transition:
      "background-color 180ms ease, border-color 180ms ease, box-shadow 180ms ease, color 180ms ease",
  },
};

export const bookverseTheme = createTheme({
  primaryColor: "copper",
  fontFamily: '"Avenir Next", "Segoe UI", sans-serif',
  defaultRadius: "md",
  colors: {
    ink: [
      "#f3f1ed",
      "#e6e0d6",
      "#d8cdbd",
      "#c9b9a3",
      "#b9a489",
      "#a88f70",
      "#8a6f52",
      "#6a533c",
      "#473727",
      "#261d15",
    ],
    copper: [
      "#fff3ea",
      "#f8dfcc",
      "#f0c8ab",
      "#e7af88",
      "#df986a",
      "#d6814d",
      "#c56a34",
      "#9b5328",
      "#703c1c",
      "#452410",
    ],
    moss: [
      "#eef5f0",
      "#d6e6da",
      "#bdd7c4",
      "#a2c8ad",
      "#86b996",
      "#6aaa7f",
      "#4f8b63",
      "#3d6b4d",
      "#2b4c37",
      "#182e21",
    ],
    brick: [
      "#fff1ef",
      "#fde0da",
      "#f3c2b8",
      "#e8a396",
      "#dd8474",
      "#d26757",
      "#bc5142",
      "#943d31",
      "#6c2a22",
      "#451814",
    ],
  },
  headings: {
    fontFamily: 'Georgia, "Times New Roman", serif',
    fontWeight: "600",
  },
  components: {
    Paper: Paper.extend({
      styles: () => surfaceStyles,
    }),
    Card: Card.extend({
      styles: () => surfaceStyles,
    }),
    Button: Button.extend({
      defaultProps: {
        radius: "l",
      },
    }),
    Menu: Menu.extend({
      styles: () => ({
        dropdown: {
          padding: "0.35rem",
          background: "var(--app-menu-bg)",
          border: "1px solid var(--app-menu-border)",
          boxShadow: "var(--app-menu-shadow)",
          color: "var(--app-menu-text)",
          backdropFilter: "blur(18px)",
        },
        label: {
          color: "var(--app-menu-label)",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        },
        divider: {
          borderColor: "var(--app-menu-divider)",
        },
        item: {
          color: "var(--app-menu-text)",
          borderRadius: "calc(var(--mantine-radius-md) - 2px)",
          transition: "background-color 160ms ease, color 160ms ease",
          "&:where(:hover, :focus):where(:not(:disabled, [data-disabled]))": {
            background: "var(--app-menu-hover-bg)",
            color: "var(--app-menu-hover-text)",
          },
          "&:where([data-disabled], :disabled)": {
            color: "var(--app-menu-muted)",
          },
        },
        itemLabel: {
          fontWeight: 500,
        },
        itemSection: {
          color: "var(--app-menu-muted)",
        },
      }),
    }),
  },
});
