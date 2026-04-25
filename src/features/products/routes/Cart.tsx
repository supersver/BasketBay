import { useAppContext } from "@/context/AppContext";
import { useStoreCartItem } from "../hooks/useStoreCartItem";
import { Button } from "@/components/Elements";
import { ArrowLeft, Trash } from "phosphor-react";
import { toast } from "react-toastify";

export const Cart = () => {
  const { cartItems } = useAppContext();
  const { removeFromCart } = useStoreCartItem();

  const handleRemoveFromCart = (itemId: number) => {
    removeFromCart(itemId);
    toast.success("Item removed from cart");
  };

  const totalItems = cartItems.length;
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <Button
        onClick={() => window.history.back()}
        className="mb-4"
        variant="outline"
        startIcon={<ArrowLeft size={16} />}
      >
        Back
      </Button>

      <div className="mb-6 flex flex-row items-center justify-between gap-2">
        <h1 className="text-xl sm:text-2xl font-bold mb-4">Your Cart</h1>
        <p className="text-sm text-gray-500 mb-6">
          {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item, index) => (
            <li
              key={index}
              className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 ${index < cartItems.length - 1 ? "border-b" : ""} `}
            >
              <div className="flex gap-2 overflow-x-auto">
                {item.images?.length > 0 ? (
                  item.images.map((image: string, id: number) => (
                    <img
                      key={id}
                      src={image}
                      alt={item.title}
                      className="h-16 w-16 sm:h-20 sm:w-20 object-cover rounded shrink-0"
                      loading="lazy"
                    />
                  ))
                ) : (
                  <div className="h-16 w-16 sm:h-20 sm:w-20 flex items-center justify-center rounded bg-gray-200 text-gray-500">
                    No Image
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full gap-2">
                <h2 className="text-base sm:text-lg font-semibold wrap-break-word">
                  {item.title}
                </h2>

                <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                  <p className="text-sm sm:text-base text-gray-500">
                    ${item.price}
                  </p>

                  <Button
                    onClick={() => handleRemoveFromCart(item.id)}
                    variant="danger"
                    size="sm"
                    startIcon={<Trash size={16} />}
                    onlyIcon
                  />
                </div>
              </div>
            </li>
          ))}

          <li className="flex items-center justify-between pt-4 border-t">
            <span className="text-lg font-bold">Total</span>
            <span className="text-lg font-bold">${totalPrice.toFixed(2)}</span>
          </li>
        </ul>
      )}
    </div>
  );
};
