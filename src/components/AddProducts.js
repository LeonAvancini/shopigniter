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
const InputStyled = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;
const ButtonStyled = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
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
        <InputStyled
          type="text"
          required
          value={productName}
          onChange={(e) => {
            setProductName(e.target.value);
          }}
        />
        <br />
        <label htmlFor="product-price">Precio del producto</label>
        <InputStyled
          type="number"
          required
          value={productPrice}
          onChange={(e) => {
            setProductPrice(e.target.value);
          }}
        />
        <br />
        <label htmlFor="product-img">Imagen del producto</label>
        <input type="file" onChange={productImgHandler} id="file" />
        <br />
        <ButtonStyled>Agregar producto</ButtonStyled>
      </FormStyled>
      {error && <span>{error}</span>}
    </Container>
  );
};

export default AddProducts;
