import React from 'react';
import logo from './logo.svg';
import './css/Style.css';
import {ProductShow} from "./components/Product";
import {Products} from "./repository/Product";
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import {HomePage} from "./components/HomePage";
import {Navbar} from "./components/Navbar";
import {PaymentPage} from "./components/Payment";
import {CartPage} from "./components/CartPage";
import {Registration} from "./components/RegisterPage";
import {LoginPage} from "./components/LoginPage";
import {useCookies} from "react-cookie";
import {ChangeProduct} from "./components/ChangeProduct";
import {AddProduct} from "./components/AddProduct";
import {ProfilePage} from "./components/ProfilePage";
import {OrderPage} from "./components/OrderPage";

export const ENDPOINT = "http://localhost:8080"

function App() {
  return (
      <BrowserRouter>
      <Navbar/>
          <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/payment" element={<PaymentPage/>}/>
              <Route path="/cart" element={<CartPage/>}/>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/registration" element={<Registration/>}/>
              <Route path="/add" element={<AddProduct/>}/>
              <Route path="/change" element={<ChangeProduct/>}/>
              <Route path="/profile" element={<ProfilePage/>}></Route>
              <Route path="/orders" element={<OrderPage/>}></Route>
          </Routes>
</BrowserRouter>
);
}

export default App;
