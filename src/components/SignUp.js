import { useState } from "react";
import { auth, db } from "../config/Config";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TitleStyled = styled.h2`
  margin: 20px;
`;
const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
`;

const MessageStyled = styled.div`
  margin: 20px;
  color: ${(props) => props.color ?? "#000000"};
`;

const ButtonStyled = styled.button`
  padding: 12px 20px;
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
export const SignUp = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((credentials) => {
        db.collection("users")
          .doc(credentials.user.uid)
          .set({ FullName: fullName, Email: email, Password: password })
          .then(() => {
            setSuccessMessage("Registro realizado con exito");
            setTimeout(() => {
              setFullName("");
              setEmail("");
              setPassword("");
              setErrorMessage("");
              navigate("/login");
            }, 3000);
          });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <Container>
      <TitleStyled>SignUp</TitleStyled>
      <hr style={{ margin: "20px 0px", width: "50%" }} />
      <FormStyled autoComplete="off" onSubmit={handleSignup}>
        <label>Nombre completo</label>
        <InputStyled
          type="text"
          required
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
          }}
        />
        <br />
        <label>Email</label>
        <InputStyled
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />

        <label>Contraseña</label>
        <InputStyled
          type="password"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <ButtonStyled type="submit">Registrarse</ButtonStyled>
      </FormStyled>
      {successMessage && (
        <MessageStyled color="green">{successMessage}</MessageStyled>
      )}
      {errorMessage && (
        <MessageStyled color="red">{errorMessage}</MessageStyled>
      )}
    </Container>
  );
};

export default SignUp;
