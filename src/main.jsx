import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {
  localStorageColorSchemeManager,
  MantineProvider,
} from "@mantine/core";
import "@mantine/core/styles.css";

import "./styles/index.css";
import App from "./App.jsx";
import { bookverseTheme } from "./theme/mantineTheme";

const colorSchemeManager = localStorageColorSchemeManager({
  key: "bookverse-color-scheme",
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider
      theme={bookverseTheme}
      colorSchemeManager={colorSchemeManager}
      defaultColorScheme="auto"
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>,
);
