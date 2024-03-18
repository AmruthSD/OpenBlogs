import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { NextUIProvider } from "@nextui-org/react";
import {
  ThemeProvider as NextThemesProvider,
  ThemeProvider,
} from "next-themes";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <BrowserRouter>
          <main className="font-sans">
            <App />
          </main>
        </BrowserRouter>
      </ThemeProvider>
    </NextUIProvider>
  </React.StrictMode>
);
