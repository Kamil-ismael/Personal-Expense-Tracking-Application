import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import Dashboard from "./component/page/Dashboard";
import { AppContextProvider } from "./context/AppContext";

createRoot(document.getElementById("root")!).render(
  <AppContextProvider>
    <Dashboard />
  </AppContextProvider>
    
  
);
