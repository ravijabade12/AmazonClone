import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  HomePage,
  NavBar,
  Checkout,
  SearhResults,
  ProductPage,
} from "./Components";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/search" element={<SearhResults />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
