import {changeProducts} from "../modules";
import React from "react";


export function ChangingProduct(uuid: string, name: string, price: number, description: string, image: string) {

    const url = `products`

    function Change() {
        changeProducts(uuid, url, name, price, description, image)
    }


    return (
        <>
            <button
                onClick={() => Change()}
                className="inline-flex justify-center rounded-md border border-transparent bg-fuchsia-700 py-2 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                Изменить
            </button>
        </>
    );

}

