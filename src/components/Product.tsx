import React, {useState} from "react"
import {Product} from "../models";
import '../css/Style.css';
import {Link} from "react-router-dom"
import {useContext} from "react";
import {MyContext} from "./HomePage";
import {getRole, getToken} from "../modules";
import {AddToCart} from "../requests/AddToCart";
import {DeleteProduct} from "../requests/DeleteProduct";

export function ProductShow(){
    const ctx = useContext(MyContext)
    let access_token = getToken()
    let showAddCartButton = true
    if (access_token == "") {
        showAddCartButton = false
    }
    const [roles, setRole] = useState()
    const role = getRole(access_token)
    role.then((result) => {
        setRole(result)
    })
    let showManagerButton = false
    if (roles === 1) {
        showManagerButton = true
    }
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
                        {showAddCartButton && <p>
                            {AddToCart(ctx.UUID)}
                        </p>}
                        {showManagerButton && <p className="mt-2">
                            {DeleteProduct(ctx.UUID)}
                        </p>}
                        <p className="mt-2">
                        {showManagerButton && <Link to="/change" className="place-self-center sm:col-span-1 mob:hidden rounded-full bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-4 border border-blue-500 hover:border-transparent rounded"
                                                    state={{UUID: ctx.UUID, Name: ctx.Name, Description: ctx.Description, Image: ctx.Image,Price:ctx.Price}}
                        >
                            Изменить
                        </Link>}
                        </p>
                        <p className="product-price">{ctx.Price} ₽</p>
                        </div>
        </div>
    );
}