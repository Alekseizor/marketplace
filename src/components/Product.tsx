import React, {useState} from "react"
import {Product} from "../models";
import '../css/Style.css';
interface ProductProps{
    product: Product
    key: number
}
export function ProductShow(props: ProductProps){
    return (
        <div className="col-sm-3 offset-md-0">
                    <div className="product-one">
                        <div className="product-img">
                            <a><img src={process.env.PUBLIC_URL + props.product.image} alt=""/></a>
                        </div>
                        <p className="product-title">
                            <a>{props.product.name}</a>
                        </p>
                        <p className="product-price">{props.product.price} ₽</p>
                    </div>
        </div>
    );
}