import { Outlet, useRoutes } from "react-router-dom";

import { Suspense, useEffect } from "react";
import { AppContextProvider } from "@/context/AppContext";

import { Spinner } from "phosphor-react";
import storage from "@/utils/storage";
import { protectedRoutes } from "./protected";
import { AuthRoutes } from "@/features/auth";
import { LandingPage } from "@/features/misc";

export const AppRoutes = () => {
  const AppLandingPage = () => {
    return (
      <AppContextProvider>
        <LandingPage>
          <Suspense
            fallback={
              <div className="h-full w-full flex items-center justify-center">
                <Spinner size={40} className="animate-spin" />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </LandingPage>
      </AppContextProvider>
    );
  };

  const commonRoutes = [
    {
      path: "/",
      element: (
        <AppContextProvider>
          <AppLandingPage />
        </AppContextProvider>
      ),
    },
    {
      path: "/auth/*",
      element: <AuthRoutes />,
    },
    { path: "*", element: <div>404 Not Found</div> },
  ];

  useEffect(() => {
    if (storage.getAccessToken() && window.location.pathname === "/") {
      window.location.assign("/app");
    }
  }, []);

  const routes = storage.getAccessToken() ? protectedRoutes : commonRoutes;

  const element = useRoutes(routes);

  return <>{element}</>;
};
