import {ENDPOINT} from "./App";
import {Product} from "./models";
import {ICart} from "./models";

export const getJsonProducts = async (url: string) => {
    const res = await fetch(`${ENDPOINT}/${url}`).then((r) => r.json() as Promise<Product[]>)
    return res
}

export const getJsonProduct = async (url: string) => {
    const res = await fetch(`${ENDPOINT}/${url}`).then((r) => r.json() as Promise<Product>)
    return res
}

export const getJsonCart = async (url: string) => {
    const res = await fetch(`${ENDPOINT}/${url}`).then((r) => r.json() as Promise<ICart[]>)
    return res
}

export const deleteCart = async (url: string) => {
    const res = await fetch(`${ENDPOINT}/${url}`, {method: "DELETE"})
    return res
}

export const addToCart = async (url: string, uuid: string) => {
    const res = await fetch(`${ENDPOINT}/${url}` , {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({Product: uuid})
    })
    console.log(5)
    console.log(res.body)
    return res
}