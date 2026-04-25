import { Outlet, useRoutes } from "react-router-dom";

import { Suspense, useEffect } from "react";
import { AppContextProvider } from "@/context/AppContext";

import { SmileyXEyes, Spinner } from "phosphor-react";
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
    {
      path: "*",
      element: (
        <div className="h-screen w-full flex flex-col items-center justify-center">
          <SmileyXEyes size={100} className="text-gray-500" weight="fill" />
          <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const accessToken = storage.getAccessToken();
    const { pathname, search } = window.location;
    const fullPath = `${pathname}${search}`;

    if (accessToken && pathname === "/") {
      // Already logged in → go to app
      window.location.assign("/app");
    } else if (!accessToken && pathname.startsWith("/app")) {
      // Not logged in but trying to access shared/private app route
      storage.setRedirectPath(fullPath);

      // Redirect to login page
      window.location.assign("/");
    }
  }, []);

  useEffect(() => {
    const accessToken = storage.getAccessToken();
    const { pathname, search } = window.location;
    const fullPath = `${pathname}${search}`;

    if (accessToken && pathname === "/") {
      window.location.assign("/app");
    } else if (!accessToken && pathname.startsWith("/app")) {
      storage.setRedirectPath(fullPath);

      window.location.assign("/");
    } else if (accessToken && pathname.startsWith("/app")) {
      storage.clearRedirectPath();
    }
  }, []);

  const routes = storage.getAccessToken() ? protectedRoutes : commonRoutes;

  const element = useRoutes(routes);

  return <>{element}</>;
};
