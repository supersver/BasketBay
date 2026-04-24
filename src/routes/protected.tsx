import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { Spinner } from "phosphor-react";
import { MainLayout } from "@/components/Layout/MainLayout";
import { Products } from "@/features/products";

const ProductsPage = () => {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="flex min-h-80 w-full items-center justify-center">
            <Spinner size={32} className="animate-spin" />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export const protectedRoutes = [
  {
    path: "/app",
    element: <ProductsPage />,
    children: [
      { index: true, element: <Products /> },
      { path: "products", element: <Products /> },
      { path: "*", element: <div>404 Not Found</div> },
    ],
  },
];
