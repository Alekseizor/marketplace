import {GetProducts} from "../requests/GetProducts";
import React, {useState} from "react";

export  function Navbar(props: { children: any }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand text-success offset-md-1" href="/">МегаМаркет</a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 offset-md-1">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/cart">Корзина</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav me-auto offset-md-2">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Вход</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
)
}