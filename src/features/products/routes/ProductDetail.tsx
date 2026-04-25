import { useParams } from "react-router-dom";
import { useGetProductById } from "../api/getProductById";
import { ArrowLeft, Spinner } from "phosphor-react";
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
    <div className="p-4">
      <Button
        onClick={() => window.history.back()}
        className="mb-4"
        variant="outline"
        startIcon={<ArrowLeft size={16} />}
      >
        Back
      </Button>
      {product && (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
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
            <span className="text-xl font-semibold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
