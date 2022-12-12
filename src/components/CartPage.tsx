import {ICart} from "../models";
import {Cart} from "./Cart";
import {GetCart} from "../requests/GetCart";
import React, {createContext} from "react";
import {cart_context} from "../context/context";
import {AddOrder} from "../requests/AddOrder";

export const MyContext = createContext(cart_context);

export function CartPage() {
    let cart = GetCart()
    let showCart = true
    if (cart.length === 0) {
        showCart = false
    }
    let product_uuid: string[] = new Array()
    cart.map((cart: ICart) => {
        product_uuid.push(cart.StoreUUID)
    })
    return (
        <>
        <div className="container content offset-md-0">
            <div className="row">
                <div className="col-md-10 offset-md-0 products">
                    <div className="row">
                        {cart.map((cart: ICart) => {
                             return (
                                 <MyContext.Provider value={cart}>
                                     <Cart/>
                                 </MyContext.Provider>
                             )
                        })
                        }
                    </div>
                </div>
            </div>
        </div>
            {showCart &&
                <form>
                    <p className="text-center">
                        {AddOrder(product_uuid)}
                    </p>
                </form>}
        </>
    )
}