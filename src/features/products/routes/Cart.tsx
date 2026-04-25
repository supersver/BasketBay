import { useAppContext } from "@/context/AppContext";

export const Cart = () => {
  const { cartItems } = useAppContext();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item, index) => (
            <li key={index} className="flex items-center gap-4">
              {item.images?.length > 0 ? (
                item?.images?.map((image: string, id: number) => (
                  <img
                    key={id}
                    src={image}
                    alt={item.title}
                    className="h-16 w-16 object-cover rounded"
                    loading="lazy"
                  />
                ))
              ) : (
                <div className="h-16 w-16 flex items-center justify-center rounded bg-gray-200 text-gray-500">
                  No Image
                </div>
              )}
              <div className="flex items-center w-full justify-between">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-500">${item.price}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
