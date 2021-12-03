import styled from "styled-components";

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
const ButtonStyled = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: lightgreen;
  }
`;
const PriceAndButtonContainer = styled.div`
  width: 100%;
  padding: 0px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Product = ({ product, addToCart }) => {
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <ProductContainer>
      <TitleStyled>{product.productName}</TitleStyled>
      <ImageContainer>
        <ImageStyled src={product.productImg} alt={product.productName} />
      </ImageContainer>
      <PriceAndButtonContainer>
        <ButtonStyled onClick={handleAddToCart}>
          Agregar al carrito
        </ButtonStyled>
        <PriceStyled>${product.productPrice}</PriceStyled>
      </PriceAndButtonContainer>
    </ProductContainer>
  );
};

export default Product;
