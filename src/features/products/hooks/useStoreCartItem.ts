import { useAppContext } from "@/context/AppContext";

export const useStoreCartItem = () => {
  const { setCartItems, cartItems } = useAppContext();

  const addToCart = (item: any) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (itemId: number) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  return {
    addToCart,
    removeFromCart,
  };
};
