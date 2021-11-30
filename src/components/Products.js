import { useEffect, useState } from "react";
import { db } from "../config/Config";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
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
const ButtonContainer = styled.button`
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
`;
const PriceAndButtonContainer = styled.div`
  width: 100%;
  padding: 0px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Products = () => {
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

  if (!products.length) {
    return <>...Cargando</>;
  }

  return (
    <Container>
      {products.map((product) => {
        return (
          <ProductContainer key={product.ID}>
            <TitleStyled>{product.productName}</TitleStyled>
            <ImageContainer>
              <ImageStyled src={product.productImg} alt={product.productName} />
            </ImageContainer>
            <PriceAndButtonContainer>
              <ButtonContainer>Agregar al carrito</ButtonContainer>
              <PriceStyled>${product.productPrice}</PriceStyled>
            </PriceAndButtonContainer>
          </ProductContainer>
        );
      })}
    </Container>
  );
};

export default Products;
