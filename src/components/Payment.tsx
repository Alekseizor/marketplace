import {Link} from "react-router-dom"
import {useLocation} from "react-router-dom"
import React from "react";

export function PaymentPage() {
    return (
        <>
             <p>/payment</p>
            <div className="line">
        <a href="/" className="inscription">МегаМаркет</a>
    </div>
    <div className="container-fluid offset-md-0">
        <div className="row">
            <div className="col-md-1 offset-md-0">
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
            <div className="col-md-10">
                <p className="oneproduct-title">
                    {useLocation().state.Name}
                </p>
                <div className="oneproductimage">
                   <img src={useLocation().state.Image} alt=""/>
                </div>
                <p className="oneproduct-price">{useLocation().state.Price} ₽</p>
                <p className="product-desc">О товаре:</p>
                <p className="product-desc">
                    {useLocation().state.Description}
                </p>
            </div>
        </div>
     </div>
    </>
    )
}