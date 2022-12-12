import React, {useContext, useState} from "react";
import {MyContext} from "./OrderPage";
import {GetUser} from "../requests/GetUser";
import {getToken, updateStatus} from "../modules";



export function Order() {
    const ctx = useContext(MyContext)
    let isList = true
    if (ctx.Products.length === 1) {
        isList = false
    }
    let access_token = getToken()

    const handleChangeStatus = (event: { target: { value: any; }; }) => {
        ctx.Status = event.target.value
        updateStatus(access_token, ctx.UUID, ctx.Status)
        window.location.replace('/orders')
    };


    return (
        <div className="border-2 border-slate-300 -mb-1 rounded py-2  grid grid-cols-4 ">
            <div className="place-self-center">
                {isList && ctx.Products.map((product, key) => {
                    return <p className="pl-2 text-center text-lg" key={key}>{key+1}) {product}</p>
                })}
                {!isList && ctx.Products.map((product, key) => {
                    return <p className="pl-2 text-center text-lg" key={key}>{product}</p>
                })}
            </div>

            <p className="place-self-center text-lg">
                {GetUser(ctx.UserUUID)}
            </p>

            <p className="place-self-center text-lg">
                {ctx.Date.replace("T", " ").split(".")[0]}
            </p>

            <div className="place-self-center">
                <select
                    onChange={handleChangeStatus}
                    value={ctx.Status}
                    className="mt-1 block w-32 rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-base"
                >
                    <option>Оформлен</option>
                    <option>Оплачен</option>
                    <option>Подтвержден</option>
                    <option>Доставлен</option>
                </select>
            </div>

        </div>
    )
}
