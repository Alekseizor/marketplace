import React from 'react';
import logo from './logo.svg';
import './css/Style.css';
import {ProductShow} from "./components/Product";
import {Products} from "./repository/Product";
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import {HomePage} from "./components/HomePage";
import {Navbar} from "./components/Navbar";
import {MilkPage} from "./components/Milk";

function App() {
  return (
      <BrowserRouter basename="/">
          <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/milk" element={<MilkPage/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
