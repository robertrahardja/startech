import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { loadCatalogue } from "./i18n";
import { parseLocalePath } from "./i18n/locales";
import "./index.css";

// The locale is in the URL, so the right catalogue can be fetched before the
// first render. This keeps the other six out of the main bundle without
// showing a loading state or a flash of English.
const { locale } = parseLocalePath(window.location.pathname);

loadCatalogue(locale).finally(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
