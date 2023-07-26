import React, { useState, createContext } from 'react';

export const MyCartContext = createContext();

export default function CartContext({children}) {
  const [count, setCount] = useState();

  return (
    <MyCartContext.Provider value={{ count, setCount }}>
      {children}
    </MyCartContext.Provider>
  );
}
