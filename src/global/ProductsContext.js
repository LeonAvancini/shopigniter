import { createContext, useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { db } from "../config/Config";

export const ProductsContext = createContext();

export const ProductsContextProvider = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    db.collection("Products").onSnapshot(onSnapshot);
  }, []);

  return <></>;
};
