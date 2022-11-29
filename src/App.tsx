import React from 'react';
import logo from './logo.svg';
import './css/Style.css';
import {ProductShow} from "./components/Product";
import {Products} from "./repository/Product";
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import {HomePage} from "./components/HomePage";
import {MilkPage} from "./components/Milk";
import {Navbar} from "./components/Navbar";
import {PaymentPage} from "./components/Payment";
import {CartPage} from "./components/CartPage";

export const ENDPOINT = "http://localhost:8080"

function App() {
  return (
      <BrowserRouter>
          {/*<div className="line">*/}
          {/*    <a href="/" className="inscription">МегаМаркет</a>*/}
          {/*</div>*/}
      <Navbar>
      </Navbar>
          <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/milk" element={<MilkPage/>}/>
              <Route path="/payment" element={<PaymentPage/>}/>
              <Route path="/cart" element={<CartPage/>}/>
          </Routes>
</BrowserRouter>

);
}

export default App;
