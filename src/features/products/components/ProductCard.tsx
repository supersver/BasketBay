import { ShoppingCartSimple } from "phosphor-react";
import { useMemo, useState } from "react";

import type { Product } from "../api/getProducts";

type ProductCardProps = {
  product: Product;
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

const getProductImage = (product: Product): string | undefined => {
  return (
    product.images?.find((image) => image?.trim()) ?? product.category?.image
  );
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const [imageFailed, setImageFailed] = useState(false);
  const imageUrl = useMemo(() => getProductImage(product), [product]);
  const shouldShowImage = Boolean(imageUrl && !imageFailed);

  const navigateToProductDetail = () => {
    window.location.href = `/app/products/${product.id}`;
  };

  return (
    <article
      onClick={() => navigateToProductDetail()}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        {shouldShowImage ? (
          <img
            src={imageUrl}
            alt={product.title}
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-4 text-center text-sm font-medium text-slate-400">
            BasketBay
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-start justify-between gap-3">
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
            {product.category?.name ?? "Product"}
          </span>
        </div>

        <h2 className="line-clamp-2 min-h-11 text-base font-semibold text-slate-950">
          {product.title}
        </h2>

        <p className="mt-2 line-clamp-2 min-h-10 text-sm text-slate-500">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <span className="text-lg font-bold text-slate-950">
            {formatPrice(product.price)}
          </span>
          <button
            type="button"
            onClick={(e) => e.stopPropagation()}
            className="flex h-10 shrink-0 items-center gap-2 rounded-md bg-slate-950 px-3 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100"
          >
            <ShoppingCartSimple size={18} />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </article>
  );
};
