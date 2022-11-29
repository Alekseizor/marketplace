import {Products} from "../repository/Product";
import {ProductShow} from "./Product";
import React, {useEffect, useState} from "react";
import {Product} from "../models";
import {getJsonProducts} from "../modules";


export function MilkPage() {
    const [Products, setProduct] = useState<Product[]>([])
    const getAllProducts = async () => {
        const result = await getJsonProducts("products/")
        await setProduct(result)
    }

    useEffect(() => {getAllProducts()}, [])
    return (
        <>
            <div className="container content offset-md-0">
                <div className="row">
                    <div className="col-md-10 offset-md-0 products">
                        <div className="row">
                            {Products.map((product, key) => {
                                if (product.Name === "Молоко") {
                                    return <ProductShow product={product} key={key}/>
                                }
                            })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}