import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AddProducts } from "./components/AddProducts";
import { SignUp } from "./components/SignUp";

import Home from "./components/Home";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addproducts" element={<AddProducts />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
