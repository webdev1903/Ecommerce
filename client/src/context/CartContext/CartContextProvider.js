import { createContext, useState } from "react";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cartState, dispatchCart] = useState(0);

  const handleCartCount = (x) => {
    dispatchCart(x);
  };

  return (
    <CartContext.Provider value={{ cartState, handleCartCount }}>
      {children}
    </CartContext.Provider>
  );
}
