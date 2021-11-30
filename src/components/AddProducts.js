import styled from "styled-components";
import { useState } from "react";
import { storage, db } from "../config/Config";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;
const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
`;
const InputStyle = styled.input`
  width: 200px;
  padding: 10px 0px;
`;
const ButtonStyled = styled.button`
  width: 200px;
  padding: 10px;
  background-color: lightgreen;
  border: 1px solid gray;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: green;
  }
`;

export const AddProducts = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productImage, setProductImage] = useState(null);
  const [error, setError] = useState("");

  const types = ["image/png", "image/jpeg"];

  const productImgHandler = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setProductImage(selectedFile);
      setError("");
    } else {
      setProductImage(null);
      setError("Por favor eliga una imagen formato .png o .jpeg");
    }
  };

  const addProducts = (e) => {
    e.preventDefault();
    //Aca subo la imagen
    const uploadTask = storage
      .ref(`product-images/${productImage.name}`)
      .put(productImage);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("PROGRESS", progress);
      },
      (err) => {
        setError(err.message);
      },
      () => {
        //Agarramos la url de la imagen, si se sube bien, entonces almacenamos los datos del producto
        storage
          .ref("product-images")
          .child(productImage.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("Products")
              .add({
                productName: productName,
                productPrice: Number(productPrice),
                productImg: url,
              })
              .then(() => {
                setProductName("");
                setProductPrice(0);
                setProductImage(null);
                setError("");
                document.getElementById("file").value = "";
              })
              .catch((err) => setError(err.message));
          });
      }
    );
  };

  return (
    <Container>
      <h2>Agregar productos</h2>
      <FormStyled autoComplete="off" action="" onSubmit={addProducts}>
        <hr style={{ margin: "20px 0px" }} />
        <label htmlFor="product-name">Nombre del producto</label>
        <InputStyle
          type="text"
          required
          value={productName}
          onChange={(e) => {
            setProductName(e.target.value);
          }}
        />
        <br />
        <label htmlFor="product-price">Precio del producto</label>
        <InputStyle
          type="number"
          required
          value={productPrice}
          onChange={(e) => {
            setProductPrice(e.target.value);
          }}
        />
        <br />
        <label htmlFor="product-img">Imagen del producto</label>
        <InputStyle type="file" onChange={productImgHandler} id="file" />
        <br />
        <ButtonStyled>Agregar producto</ButtonStyled>
      </FormStyled>
      {error && <span>{error}</span>}
    </Container>
  );
};

export default AddProducts;
