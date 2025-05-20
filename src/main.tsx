import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext.tsx";
import { LoggedProvider } from "./contexts/UserLoggedStateContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <LoggedProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </LoggedProvider>
  </BrowserRouter>
);
