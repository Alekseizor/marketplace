import {addProduct} from "../modules";
import React from "react";


export function AddingProduct(name: string, price: number, description: string, image: string) {

    const url = `products`

    function Add() {
        addProduct(url, name, price, description, image)
    }


    return (
        <>
            <button
                onClick={() => Add()}
                className="inline-flex justify-center rounded-md border border-transparent bg-fuchsia-700 py-2 px-4 text-base font-medium text-white shadow-sm hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-700 focus:ring-offset-2"
            >
                Добавить
            </button>
        </>
    );

}

