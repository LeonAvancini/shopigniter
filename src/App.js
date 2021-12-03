import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AddProducts } from "./components/AddProducts";
import { SignUp } from "./components/SignUp";

import Home from "./components/Home";
import Login from "./components/Login";
import Cart from "./components/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addproducts" element={<AddProducts />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
