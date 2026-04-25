import { useState, useMemo, useEffect } from "react";
import { CircleNotch, Spinner, XCircle } from "phosphor-react";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

import { ProductCard, ProductFilter } from "../components";
import { useGetProducts } from "../api/getProducts";
import { Tooltip } from "@/components/Elements";
import type { Product } from "../api/getProducts";
import type { CategoryOption, ProductSortOption } from "../components";
import { useAppContext } from "@/context/AppContext";

const getUniqueCategories = (products: Product[]): CategoryOption[] => {
  const categoriesById = new Map<number, CategoryOption>();

  products.forEach((product) => {
    if (product.category?.id && product.category.name) {
      categoriesById.set(product.category.id, {
        id: product.category.id,
        name: product.category.name,
      });
    }
  });

  return Array.from(categoriesById.values()).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
};

const sortProducts = (products: Product[], sortBy: ProductSortOption) => {
  const sorted = [...products];

  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "title-asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "title-desc":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case "newest":
      return sorted.sort(
        (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
      );
    default:
      return sorted;
  }
};

const getFiltersFromURL = (params: URLSearchParams) => ({
  categoryIds: params
    .getAll("categoryId")
    .map(Number)
    .filter((id) => id > 0),
  sortBy: (params.get("sort") || "featured") as ProductSortOption,
});

const defaultFilters = {
  categoryIds: [],
  sortBy: "featured" as ProductSortOption,
};

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [draftFilters, setDraftFilters] = useState(() =>
    getFiltersFromURL(searchParams),
  );
  const [appliedFilters, setAppliedFilters] = useState(() =>
    getFiltersFromURL(searchParams),
  );

  const { cartItems } = useAppContext();

  useEffect(() => {
    const filters = getFiltersFromURL(searchParams);
    setDraftFilters(filters);
    setAppliedFilters(filters);
  }, [searchParams]);

  const { data: allProducts = [] } = useGetProducts({ limit: 100 });
  const {
    data: products = [],
    isError,
    isLoading,
    isRefetching,
    refetch,
  } = useGetProducts({
    limit: 100,
    categoryIds: appliedFilters.categoryIds,
  });

  useEffect(() => {
    if (isError)
      toast.error("Failed to fetch products. Please try again later.");
  }, [isError]);

  const categories = useMemo(
    () => getUniqueCategories(allProducts),
    [allProducts],
  );
  const sortedProducts = useMemo(
    () => sortProducts(products, appliedFilters.sortBy),
    [products, appliedFilters.sortBy],
  );

  const isProductInCart = (productId: number) => {
    return cartItems.some((item) => item.id === productId);
  };

  const hasUnappliedChanges =
    JSON.stringify(draftFilters) !== JSON.stringify(appliedFilters);

  const handleCategoryToggle = (categoryId: number) => {
    setDraftFilters((prev) => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(categoryId)
        ? prev.categoryIds.filter((id) => id !== categoryId)
        : [...prev.categoryIds, categoryId],
    }));
  };

  const handleApplyFilters = () => {
    setAppliedFilters(draftFilters);
    const params = new URLSearchParams();

    draftFilters.categoryIds.forEach((id) =>
      params.append("categoryId", String(id)),
    );
    if (draftFilters.sortBy !== "featured")
      params.set("sort", draftFilters.sortBy);

    setSearchParams(params);
  };

  const handleClearFilters = () => {
    setDraftFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
    setSearchParams(new URLSearchParams());
  };

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
        <div className="mt-4 flex items-center gap-4">
          <Tooltip content="Refresh list">
            <button
              type="button"
              onClick={() => refetch()}
              className="flex items-center"
            >
              <CircleNotch
                size={18}
                className={isRefetching ? "animate-spin" : ""}
              />
            </button>
          </Tooltip>
          <p className="text-sm text-slate-500">
            {sortedProducts.length} items shown
          </p>
        </div>
      </div>

      <ProductFilter
        categories={categories}
        selectedCategoryIds={draftFilters.categoryIds}
        sortBy={draftFilters.sortBy}
        onCategoryToggle={handleCategoryToggle}
        onSortChange={(value) =>
          setDraftFilters((prev) => ({ ...prev, sortBy: value }))
        }
        onClear={handleClearFilters}
        onApply={handleApplyFilters}
        hasUnappliedChanges={hasUnappliedChanges}
      />

      {isLoading ? (
        <div className="flex min-h-80 items-center justify-center">
          <Spinner size={36} className="animate-spin text-emerald-600" />
        </div>
      ) : sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isInCart={isProductInCart(product.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col min-h-80 justify-center items-center rounded-lg border border-dashed border-slate-300 bg-white px-4 text-center text-sm text-slate-500">
          <XCircle size={55} className="text-slate-400" />
          No products found for the selected filters.
        </div>
      )}
    </section>
  );
};
