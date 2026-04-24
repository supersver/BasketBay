import { Outlet, useRoutes } from "react-router-dom";

import { Suspense } from "react";
import { AppContextProvider } from "@/context/AppContext";
import storage from "@/utils/storage";

import App from "@/App";
import { Spinner } from "phosphor-react";

export const AppRoutes = () => {
  const AppPage = () => {
    return (
      <AppContextProvider>
        <App>
          <Suspense
            fallback={
              <div className="h-full w-full flex items-center justify-center">
                <Spinner size={40} className="animate-spin" />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </App>
      </AppContextProvider>
    );
  };

  const commonRoutes = [
    {
      path: "/",
      element: (
        <AppContextProvider>
          <AppPage />
        </AppContextProvider>
      ),
    },

    { path: "*", element: <div>404 Not Found</div> },
  ];

  const routes = commonRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
