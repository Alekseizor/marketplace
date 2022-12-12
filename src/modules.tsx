import {ENDPOINT} from "./App";
import {Product} from "./models";
import {ICart} from "./models";
import axios from "axios";


export const getJsonProducts = async (url: string) => {
    const res = await fetch(`${ENDPOINT}/${url}`).then((r) => r.json() as Promise<Product[]>)
    return res
}
export function getRole(token: string) {
    return axios.get(`${ENDPOINT}/role`, {withCredentials: true, headers: {
            "Authorization": `Bearer ${token}`
        }}).then(r => r.data)
}

export function getToken() {
    let tokens = document.cookie.split(' ')
    let access_token = ''
    for (var i = 0; i < tokens.length; i++) {
        if (tokens[i].startsWith("access_token=")) {
            access_token = tokens[i].replace("access_token=", "")
        }
    }
    return access_token.replace(";", "")
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

export function addToCart (url: string, uuid: string)  {
    const body = { StoreUUID: uuid }
    let access_token = getToken()
    return  axios.post(`${ENDPOINT}/${url}`, body, {withCredentials: true, headers: {
            "Authorization": `Bearer ${access_token}`
        }}).then(function (response) {
        console.log(response);
    })
}

export function deleteProduct (url: string, uuid: string) {
    let access_token = getToken()
    return axios.delete(`${ENDPOINT}/${url}/${uuid}`, {withCredentials: true, headers: {
            "Authorization": `Bearer ${access_token}`
        }}).then(r => r.data)
}

export function createUser(url: string, name: string, pass: string) {
    const body = {name: name, pass: pass}
    return axios.post(`${ENDPOINT}/${url}`, body, {withCredentials: true}).then(function (response) {
        console.log(response)
        window.location.replace("/login")
    }).catch(function () {
        window.location.replace("/registration")
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

export function getFromBackendToken(url: string) {
    let access_token = getToken()
    return axios.get(`${ENDPOINT}/${url}`, {withCredentials: true, headers: {
            "Authorization": `Bearer ${access_token}`
        }}).then(r => r.data)
}

export function deleteFromBackendToken(url: string) {
    let access_token = getToken()
    return axios.delete(`${ENDPOINT}/${url}`, {withCredentials: true, headers: {
            "Authorization": `Bearer ${access_token}`
        }}).then(r => r.data)
}

export function changeProducts(uuid: string, url: string, name: string, price: number, description: string, image: string)  {
    const body = {
        Price: price,
        Image: image,
        Description: description,
        Name: name,
    }
    let access_token = getToken()
    return  axios.put(`${ENDPOINT}/${url}/${uuid}`, body, {withCredentials: true, headers: {
            "Authorization": `Bearer ${access_token}`
        }}).then(function (response) {
        console.log(response);
    })

}

export function addProduct(url: string, name: string, price: number, description: string, image: string)  {
    const body = {
        Price: price,
        Image: image,
        Description: description,
        Name: name,
    }
    let access_token = getToken()
    console.log(body)
    return  axios.post(`${ENDPOINT}/${url}`, body, {withCredentials: true, headers: {
            "Authorization": `Bearer ${access_token}`
        }}).then(function (response) {
        console.log(response);
    })

}

export function updateStatus(token: string, uuid: string, status: string) {
    const body = { Status: status }
    return axios.put(`${ENDPOINT}/orders/${uuid}`, body,{withCredentials: true, headers: {
            "Authorization": `Bearer ${token}`
        }}).then(r => r.data)
}

export function addOrder (url: string, products_uuid: string[])  {
    const body = { Products: products_uuid }
    let access_token = getToken()
    return  axios.post(`${ENDPOINT}/${url}`, body, {withCredentials: true, headers: {
            "Authorization": `Bearer ${access_token}`
        }}).then(function (response) {
        console.log(response);
    })

}