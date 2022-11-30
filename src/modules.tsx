import {ENDPOINT} from "./App";
import {Product} from "./models";
import {ICart} from "./models";
import axios from "axios";


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

export function createUser(url: string, name: string, pass: string) {
    const body = {name: name, pass: pass}
    return axios.post(`${ENDPOINT}/${url}`, body).then(function (response) {
        console.log(response);
    })

}


export function loginUser (url: string, name: string, pass: string)  {
    const body = { login: name, password: pass }
    return axios.post(`${ENDPOINT}/${url}`, body, {withCredentials: true}).then(function (response) {
        console.log(response)
        window.location.replace("/")
    }).catch(function (reason) {
        window.location.replace("/login")
    })
}

export function logoutUser (url: string) {
    let access_token = document.cookie.replace("access_token=", "")
    console.log(access_token)
    return axios.get(`${ENDPOINT}/${url}`, {withCredentials: true, headers: {
            "Authorization": `Bearer ${access_token}`
        }}).then(function (r) {
        console.log(r.data)
        window.location.replace("/login")
    })
}