import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { CustomerProvider } from "./contexts/CustomerContext";
import { AuthProvider } from "./hooks/useAuth";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
  <AuthProvider>
    <CustomerProvider>
      <TicketProvider>
        <CloudIntegrationProvider>
          <App />
        </CloudIntegrationProvider>
      </TicketProvider>
    </CustomerProvider>
  </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
