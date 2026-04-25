import { useParams } from "react-router-dom";
import { useGetProductById } from "../api/getProductById";
import { ArrowLeft, ShoppingCartSimple, Spinner } from "phosphor-react";
import { Button } from "@/components/Elements";

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || "", 10);
  const { data: product, isLoading, error } = useGetProductById(productId);

  {
    isLoading && (
      <div className="flex min-h-80 w-full items-center justify-center">
        <Spinner size={32} className="animate-spin" />
      </div>
    );
  }
  {
    error && <p>Error loading product: {error.message}</p>;
  }
  return (
    <div>
      <Button
        onClick={() => window.history.back()}
        className="mb-4"
        variant="outline"
        startIcon={<ArrowLeft size={16} />}
      >
        Back
      </Button>
      {product && (
        <div className="lg:flex p-4 mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          {product.images && product.images.length > 0 && (
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full max-w-md rounded-lg"
            />
          )}{" "}
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <div className="mt-auto flex items-center justify-between gap-3 pt-4">
              <span className="text-lg font-bold text-slate-950">
                ${product.price.toFixed(2)}
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
        </div>
      )}
    </div>
  );
};
