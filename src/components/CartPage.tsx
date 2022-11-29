import {ICart} from "../models";
import {Cart} from "./Cart";
import {GetCart} from "../requests/GetCart";
import React, {createContext} from "react";
import {cart_context} from "../context/context";


export const MyContext = createContext(cart_context);

export function CartPage() {
    return (
        <div className="container content offset-md-0">
            <div className="row">
                <div className="col-md-10 offset-md-0 products">
                    <div className="row">
                        {GetCart().map((cart: ICart) => {
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
    )
}