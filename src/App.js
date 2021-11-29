import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AddProducts } from "./components/AddProducts";

import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addproducts" element={<AddProducts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
