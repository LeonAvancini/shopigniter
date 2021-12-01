import { useState } from "react";
import { auth } from "../config/Config";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setSuccessMessage("Ingreso exitoso");
        setEmail("");
        setPassword("");
        setErrorMessage("");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((error) => setErrorMessage(error.message));
  };

  return (
    <>
      <h2>Login</h2>
      {successMessage && <>{successMessage}</>}
      <form autoComplete="off" onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      {errorMessage && <>{errorMessage}</>}
    </>
  );
};

export default Login;
