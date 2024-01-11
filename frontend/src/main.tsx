import ReactDOM from "react-dom/client";

import { App } from "@/App.tsx";
import { ErrorBoundary } from "@/components/ErrorBoundary";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);