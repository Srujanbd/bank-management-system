import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import "./App.css";

import App from "./App";
import { ToastProvider } from "./context/ToastContext";
import { NotificationProvider } from "./context/NotificationContext";

createRoot(document.getElementById("root")).render(
    <StrictMode>

        <ToastProvider>

            <NotificationProvider>

                <App />

            </NotificationProvider>

        </ToastProvider>

    </StrictMode>
);