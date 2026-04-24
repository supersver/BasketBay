import { Spinner } from "phosphor-react";
import { toast } from "react-toastify";
import { useEffect } from "react";

import { ProductCard } from "../components";
import { useGetProducts } from "../api/getProducts";

export const Products = () => {
  const {
    data: products = [],
    isError,
    isLoading,
    isRefetching,
    refetch,
  } = useGetProducts();

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch products. Please try again later.");
    }
  }, [isError]);

  if (isLoading) {
    return (
      <div className="flex min-h-80 items-center justify-center">
        <Spinner size={36} className="animate-spin text-emerald-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <section className="flex min-h-80 flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white px-4 text-center">
        <h1 className="text-xl font-semibold text-slate-950">
          Products could not load
        </h1>
        <p className="mt-2 max-w-md text-sm text-slate-500">
          Please try refreshing the catalog.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-5 rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100"
        >
          {isRefetching ? "Refreshing..." : "Try again"}
        </button>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-emerald-600">
            BasketBay
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-950 sm:text-3xl">
            Products
          </h1>
        </div>
        <p className="text-sm text-slate-500">
          {products.length} items available
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-80 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white px-4 text-center text-sm text-slate-500">
          No products found.
        </div>
      )}
    </section>
  );
};
