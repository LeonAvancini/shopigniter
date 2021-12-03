import { useEffect, useState } from "react";
import { auth, db } from "../config/Config";
import CartProduct from "./CartProduct";
import Navbar from "./Navbar";
import styled from "styled-components";
import DeliveryCash from "./DeliveryCash";
import Modal from "react-modal";

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
  margin-bottom: 20px;
`;
const ParagraphStyled = styled.p`
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 5px;
`;
const NumberStyled = styled.p`
  color: green;
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 10px;
`;

const CartInfoContainer = styled.div`
  border: 2px solid lightgray;
  border-radius: 25px;
  margin: 0px 0px 20px 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 20px;
`;

const ButtonStyled = styled.button`
  padding: 12px 20px;
  margin: 0 auto;
  margin-top: 10px;
  border: 2px solid darkgray;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    border: 2px solid green;
    background-color: green;
  }
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const Cart = () => {
  const [user, setUser] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalProductsPrice, setTotalProductsPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

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
  });

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
          const reducingQuantity = quantity.reduce(
            (acum, act) => acum + act,
            0
          );
          const price = newCartProduct.map((cartProduct) => {
            return cartProduct.productPrice;
          });
          const reducingPrice = price.reduce((acum, act) => acum + act, 0);
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
            <TitleStyled>Informacion de compra</TitleStyled>
            <ParagraphStyled>Cantidad de productos</ParagraphStyled>
            <NumberStyled>{totalProducts}</NumberStyled>
            <ParagraphStyled>Total a pagar</ParagraphStyled>
            <NumberStyled>${totalProductsPrice}</NumberStyled>
            <ButtonStyled onClick={handleModal}>
              Envio y pago por delivery
            </ButtonStyled>
          </CartInfoContainer>
        </>
      )}
      {showModal && (
        <Modal isOpen={handleModal} style={customStyles} ariaHideApp={false}>
          <DeliveryCash
            closeModalHandling={closeModal}
            totalProducts={totalProducts}
            totalProductsPrice={totalProductsPrice}
          />
        </Modal>
      )}
    </Container>
  );
};

export default Cart;
