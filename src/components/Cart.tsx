
import {GetProduct} from "../requests/GetProduct";
import {Link} from "react-router-dom";
import React, {useContext} from "react";
import {MyContext} from "./CartPage";
import {DeleteFromCart} from "../requests/DeleteFromCart";
import {AddToCart} from "../requests/AddToCart";


export function Cart() {
    const ctx = useContext(MyContext)
    let Product = GetProduct(ctx.StoreUUID)
    return (
        <div className="col-sm-3 offset-md-0">
            <div className="product-one">
                <div className="product-img">
                    <Link to="/payment"
                          state={{Name: Product.Name, Price: Product.Price, Image: Product.Image,Description: Product.Description}}>
                        <img src={Product.Image} alt=""/>
                    </Link>
                </div>
                <p className="product-title">
                    <a>{Product.Name}</a>
                </p>
                <p className="product-price">{Product.Price} ₽</p>
                <p>
                    {DeleteFromCart(ctx.UUID)}
                </p>
            </div>
        </div>
    );
}