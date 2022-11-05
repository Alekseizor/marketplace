import {Products} from "../repository/Product";
import {ProductShow} from "./Product";
import React from "react";


export function MilkPage() {
    return (
        <>
            <p>/milk</p>
            <div className="line">
                <a href="/" className="inscription">МегаМаркет</a>
            </div>
            <div className="container content offset-md-0">
                <div className="row">
                    <div className="col-md-2 offset-md-0">
                        <div className="list-group">
                            <a href="/milk" className="list-group-item">Молочная продукция</a>
                            <a href="#" className="list-group-item">Овощи</a>
                            <a href="#" className="list-group-item">Макароны, крупы</a>
                            <a href="#" className="list-group-item">Мясо</a>
                            <a href="#" className="list-group-item">Выпечка и хлеб</a>
                            <a href="#" className="list-group-item">Соусы</a>
                            <a href="#" className="list-group-item">Колбасы</a>
                            <a href="#" className="list-group-item">Сладости</a>
                        </div>
                    </div>
                    <div className="col-md-10 offset-md-0 products">
                        <div className="row">
                            {Products.map((product, key) => {
                                if (product.name === "Молоко") {
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