import {Link} from "react-router-dom"
import {useLocation} from "react-router-dom"
import React from "react";

export function PaymentPage() {
    return (
        <>
    <div className="container-fluid offset-md-0">
        <div className="row">
            <div className="col-md-12">
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