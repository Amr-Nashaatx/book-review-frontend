import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

import "./styles/index.css";
import App from "./App.jsx";
import { bookverseTheme } from "./theme/mantineTheme";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider theme={bookverseTheme} defaultColorScheme="light">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>,
);
