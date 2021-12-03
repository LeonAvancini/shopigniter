import styled from "styled-components";
import { auth, db } from "../config/Config";

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 400px;
  height: 500px;
  border: 1px solid gray;
  margin: 20px;
`;
const TitleStyled = styled.h2``;
const PriceStyled = styled.p`
  font-size: 30px;
  font-weight: bold;
  color: red;
`;
const ImageContainer = styled.div`
  height: 300px;
`;
const ImageStyled = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

const PriceAndButtonContainer = styled.div`
  width: 100%;
  padding: 0px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ButtonStyled = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: red;
  }
`;

export const CartProduct = ({ product }) => {
  const handleDeleteFromCart = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection(`${"Cart" + user.uid}`)
          .doc(product.ID)
          .delete()
          .then(() => {
            console.log("Producto elminado del carrito correctamente");
          });
      } else {
      }
    });
  };

  return (
    <ProductContainer>
      <TitleStyled>{product.productName}</TitleStyled>
      <ImageContainer>
        <ImageStyled src={product.productImg} alt={product.productName} />
      </ImageContainer>
      <PriceAndButtonContainer>
        <ButtonStyled onClick={handleDeleteFromCart}>
          Eliminar del carrito
        </ButtonStyled>
        <PriceStyled>${product.productPrice}</PriceStyled>
      </PriceAndButtonContainer>
    </ProductContainer>
  );
};

export default CartProduct;
