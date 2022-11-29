import React, {useState} from "react"
import {Product} from "../models";
import '../css/Style.css';
import {Link} from "react-router-dom"
import {useContext} from "react";
import {MyContext} from "./HomePage";
import {AddToCart} from "../requests/AddToCart";
export interface ProductProps{
    product: Product
}
export function ProductShow(props: ProductProps){
    const ctx = useContext(MyContext)
    return (
        <div className="col-sm-3 offset-md-0">
                    <div className="product-one">
                        <div className="product-img">
                            <Link to="/payment"
                                  state={{Name: props.product.Name, Price: props.product.Price, Image: props.product.Image,Description: props.product.Description}}>
                            <img src={props.product.Image} alt=""/>
                            </Link>
                        </div>
                        <p className="product-title">
                            <a>{props.product.Name}</a>
                        </p>
                        <p className="product-price">{props.product.Price} ₽</p>
                        <p>
                                {AddToCart(ctx.UUID)}
                        </p>
                    </div>
        </div>
    );
}