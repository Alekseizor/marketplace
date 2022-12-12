import {deleteProduct} from "../modules";
import React from "react";

export function DeleteProduct(uuid: string) {

    const url = `products`

    function Delete() {
        deleteProduct(url, uuid)
    }

    return (
        <>
            <button type="button" className="btn btn-outline-danger" onClick={() => Delete()}>Удалить продукт</button>
        </>
    );

}