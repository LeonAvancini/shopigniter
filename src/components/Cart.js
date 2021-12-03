import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { auth, db } from "../config/Config";
import CartProduct from "./CartProduct";
import Navbar from "./Navbar";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ProductsContainer = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const TitleStyled = styled.h2`
  margin: 20px;
`;

const CartInfoContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Cart = () => {
  const [user, setUser] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalProductsPrice, setTotalProductsPrice] = useState(0);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("users")
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            setUser(snapshot.data().FullName);
          });
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection(`${"Cart" + user.uid}`).onSnapshot((snapshot) => {
          const newCartProduct = snapshot.docs.map((doc) => ({
            ID: doc.id,
            ...doc.data(),
          }));
          const quantity = newCartProduct.map((cartProduct) => {
            return cartProduct.quantity;
          });
          const reducingQuantity = quantity.reduce((acum, act) => acum + act);
          const price = newCartProduct.map((cartProduct) => {
            return cartProduct.productPrice;
          });
          const reducingPrice = price.reduce((acum, act) => acum + act);
          setTotalProducts(reducingQuantity);
          setTotalProductsPrice(reducingPrice);
          setCartProducts(newCartProduct);
        });
      } else {
        console.log(
          "Usuario no registrado, no puede ver los productos del carrito"
        );
      }
    });
  }, []);

  return (
    <Container>
      <Navbar user={user} />
      <br></br>
      <TitleStyled>Carrito</TitleStyled>
      {!cartProducts.length ? (
        <>No hay productos para mostrar</>
      ) : (
        <>
          <ProductsContainer>
            {cartProducts.map((product) => (
              <div key={product.ID}>
                <CartProduct product={product} />
              </div>
            ))}
          </ProductsContainer>
          <CartInfoContainer>
            <TitleStyled>Informacio de carrito</TitleStyled>
            <p>Cantidad de productos: {totalProducts}</p>
            <p>Total a pagar: {totalProductsPrice}</p>
            <StripeCheckout></StripeCheckout>
          </CartInfoContainer>
        </>
      )}
    </Container>
  );
};

export default Cart;
