import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { lazyImport } from "@/utils/lazyImport";
import { Spinner } from "phosphor-react";

const App = () => {
  return (
    <Suspense
      fallback={
        <div className="h-full w-full flex items-center justify-center">
          <Spinner size={32} className="animate-spin" />
        </div>
      }
    >
      <Outlet />
    </Suspense>
  );
};

export const protectedRoutes = [
  {
    path: "/app",
    element: <App />,
    children: [{ path: "*", element: <div>404 Not Found</div> }],
  },
];
