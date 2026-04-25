import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { SmileyXEyes, Spinner } from "phosphor-react";

import { MainLayout } from "@/components/Layout/MainLayout";
import { Products } from "@/features/products";
import { Profile } from "@/features/user";
import { Cart, ProductDetail } from "@/features/products";

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

const ProductDetailPage = () => {
  return <ProductDetail />;
};

const UserProfilePage = () => {
  return <Profile />;
};

export const protectedRoutes = [
  {
    path: "/app",
    element: <ProductsPage />,
    children: [
      { index: true, element: <Products /> },
      { path: "products", element: <Products /> },
      { path: "products/:id", element: <ProductDetailPage /> },
      { path: "profile", element: <UserProfilePage /> },
      { path: "cart", element: <Cart /> },
      {
        path: "*",
        element: (
          <div className="h-screen w-full flex flex-col items-center justify-center">
            <SmileyXEyes size={100} className="text-gray-500" weight="fill" />
            <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
          </div>
        ),
      },
    ],
  },
];
