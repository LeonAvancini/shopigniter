import { useEffect, useState } from "react";
import { db } from "../config/Config";
import styled from "styled-components";
import Product from "./Product";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Products = ({ userId }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const products = await db.collection("Products").get();
    const productsArray = [];

    for (var snap of products.docs) {
      var data = snap.data();
      data.ID = snap.id;
      productsArray.push({ ...data });
      if (productsArray.length === products.docs.length) {
        setProducts(productsArray);
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const addProductToCart = (product) => {
    let Product;

    if (userId) {
      Product = product;
      Product[`quantity`] = 1;
      Product[`totalProductPrice`] = Product.quantity * product.productPrice;
      db.collection(`${"Cart" + userId}`)
        .doc(product.ID)
        .set(Product)
        .then(() => {
          console.log("Agregado al carrito correctamente");
        });
    } else {
      navigate("/login");
    }
  };

  if (!products.length) {
    return null;
  }

  return (
    <Container>
      {products.map((product) => {
        return (
          <Product
            key={product.ID}
            product={product}
            addToCart={addProductToCart}
          />
        );
      })}
    </Container>
  );
};

export default Products;
