import { useParams } from "react-router-dom";
import { useGetProductById } from "../api/getProductById";
import { ArrowLeft, ShoppingCartSimple, Spinner } from "phosphor-react";
import { Button } from "@/components/Elements";
import { useStoreCartItem } from "../hooks/useStoreCartItem";
import { toast } from "react-toastify";

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || "", 10);

  const { data: product, isLoading, error } = useGetProductById(productId);

  const { addToCart } = useStoreCartItem();

  if (isLoading) {
    <div className="flex min-h-80 w-full items-center justify-center">
      <Spinner size={32} className="animate-spin" />
    </div>;
  }

  if (error) {
    <p>Error loading product: {error.message}</p>;
  }

  const isProductInCart = (productId: number) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    return cartItems.some((item: any) => item.id === productId);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    toast.success("Item added to cart");
  };
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
          <div className="flex gap-2 overflow-x-auto mb-4 lg:mb-0 lg:w-2/3">
            {product.images &&
              product.images.length > 0 &&
              product?.images?.map((imgUrl, index) => (
                <img
                  key={index}
                  src={imgUrl}
                  alt={product.title}
                  className="w-full h-64 object-cover rounded-lg mb-4 lg:mb-0 lg:w-full"
                />
              ))}
          </div>
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <div className="mt-auto flex items-center justify-between gap-3 pt-4">
              <span className="text-lg font-bold text-slate-950">
                ${product.price.toFixed(2)}
              </span>
              {isProductInCart(product.id) ? (
                <span className="flex h-10 shrink-0 cursor-not-allowed items-center gap-2 rounded-md bg-gray-300 px-3 text-sm font-semibold text-gray-600">
                  <ShoppingCartSimple size={18} />
                  In Cart
                </span>
              ) : (
                <button
                  type="button"
                  onClick={(e) => handleAddToCart(e)}
                  className="flex h-10 shrink-0 items-center gap-2 rounded-md bg-slate-950 px-3 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100"
                >
                  <ShoppingCartSimple size={18} />
                  <span className="hidden sm:inline">Add</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
