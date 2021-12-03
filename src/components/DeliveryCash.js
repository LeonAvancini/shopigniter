import { useState } from "react";
import styled from "styled-components";
import { auth, db } from "../config/Config";
import { useNavigate } from "react-router-dom";

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TitleStyled = styled.h2`
  margin: 0px 20px;
`;
const FormStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonStyled = styled.button`
  padding: 12px 20px;
  margin: 5px 0px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;
const InputStyled = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;

export const DeliveryCash = ({
  closeModalHandling,
  totalProducts,
  totalProductsPrice,
}) => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleCashOnDelivery = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const userData = await db.collection("users").doc(uid).get();
    await db.collection("Buyer-Personal-Info").add({
      Name: userData.data().FullName,
      Email: userData.data().Email,
      PhoneNumber: phone,
      Address: address,
      CartPrice: totalProductsPrice,
      CartQuantity: totalProducts,
    });
    const cartData = await db.collection(`${"Cart" + uid}`).get();
    for (var snap of cartData.docs) {
      var data = snap.data();
      data.ID = snap.id;
      await db.collection(`${"Buyer-Cart" + uid}`).add(data);
      await db
        .collection(`${"Cart" + uid}`)
        .doc(snap.id)
        .delete();
    }
    closeModalHandling();
    navigate("/");
  };

  return (
    <ModalContainer>
      <TitleStyled>Realizar pedido</TitleStyled>
      <hr style={{ margin: "20px 0px", width: "100%" }} />
      <FormStyled>
        <label>Telefono/Celular</label>
        <InputStyled
          type="number"
          required
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <br />
        <label>Direccion</label>
        <InputStyled
          type="text"
          required
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <br />
        <label>Total de productos</label>
        <InputStyled type="number" readOnly required value={totalProducts} />
        <br />
        <label>Total a pagar</label>
        <InputStyled type="number" readOnly value={totalProductsPrice} />
        <br />
        <ButtonStyled onClick={(e) => handleCashOnDelivery(e)}>
          Realizar pedido
        </ButtonStyled>
        <ButtonStyled onClick={closeModalHandling}>Cerrar</ButtonStyled>
      </FormStyled>
    </ModalContainer>
  );
};

export default DeliveryCash;
