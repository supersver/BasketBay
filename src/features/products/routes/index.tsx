import { Route, Routes } from "react-router-dom";
import { Products } from "./Products";

export const ProductRoutes = () => {
  return (
    <Routes>
      <Route index element={<Products />} />
      <Route path="products" element={<Products />} />
    </Routes>
  );
};

export * from "./Products";
