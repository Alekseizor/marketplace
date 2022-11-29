import {addToCart} from "../modules";
import React from "react";

export function AddToCart(uuid: string) {

    const url = `cart/`

    function Add() {
        addToCart(url, uuid)
    }


    return (
        <>
            <button type="button" className="btn btn-outline-success" onClick={() => Add()}>Добавить в корзину</button>
        </>
    );

}