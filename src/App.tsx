import { StrictMode } from "react";
import { AppRoutes } from "./routes";
import { AppProvider } from "./providers/AppProvider";
import { AppContextProvider } from "./context/AppContext";

function App({ children }: { children?: React.ReactNode }) {
  if (children) {
    return <>{children}</>;
  }

  return (
    <StrictMode>
      <AppProvider>
        <AppContextProvider>
          <AppRoutes />
        </AppContextProvider>
      </AppProvider>
    </StrictMode>
  );
}

export default App;
