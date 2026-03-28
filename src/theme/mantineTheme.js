import { Button, createTheme } from "@mantine/core";

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
  },
  headings: {
    fontFamily: 'Georgia, "Times New Roman", serif',
    fontWeight: "600",
  },
  components: {
    Button: Button.extend({
      defaultProps: {
        radius: "l",
      },
    }),
  },
});
