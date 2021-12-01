import { useState } from "react";
import { auth, db } from "../config/Config";
import { useNavigate } from "react-router-dom";

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
            setFullName("");
            setEmail("");
            setPassword("");
            setErrorMessage("");
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <>
      <h2>SignUp</h2>
      {successMessage && <>{successMessage}</>}
      <form autoComplete="off" onSubmit={handleSignup}>
        <label>Nombre completo</label>
        <input
          type="text"
          required
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
          }}
        />
        <br />
        <label>Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />

        <label>Nombre completo</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <button type="submit">Registrarse</button>
      </form>
      {errorMessage && <>{errorMessage}</>}
    </>
  );
};

export default SignUp;
