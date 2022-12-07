import React, {useState} from "react"
import {Product} from "../models";
import '../css/Style.css';
import {Link} from "react-router-dom"
import {useContext} from "react";
import {MyContext} from "./HomePage";
import {AddToCart} from "../requests/AddToCart";


export function ProductShow(){
    const ctx = useContext(MyContext)
    return (
        <div className="col-sm-3 offset-md-0">
                    <div className="product-one">
                        <div className="product-img">
                            <Link to="/payment"
                                  state={{Name: ctx.Name, Price: ctx.Price, Image: ctx.Image,Description: ctx.Description}}>
                            <img src={ctx.Image} alt=""/>
                            </Link>
                        </div>
                        <p className="product-title">
                            <a>{ctx.Name}</a>
                        </p>
                        <p className="product-price">{ctx.Price} ₽</p>
                        <p>
                                {AddToCart(ctx.UUID)}
                        </p>
                    </div>
        </div>
    );
}