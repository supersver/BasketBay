import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface AppContextType {
  cartItems: {
    id: number;
    title: string;
    price: number;
    quantity: number;
    images?: string[];
  }[];
  setCartItems: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        title: string;
        price: number;
        quantity: number;
        images?: string[] | undefined;
      }[]
    >
  >;
  userDetails?: any;
  setUserDetails?: React.Dispatch<React.SetStateAction<any>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<
    {
      id: number;
      title: string;
      price: number;
      quantity: number;
      images?: string[] | undefined;
    }[]
  >([]);
  const [userDetails, setUserDetails] = useState<any>(null);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <AppContext.Provider
      value={{
        cartItems,
        setCartItems,
        userDetails,
        setUserDetails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
