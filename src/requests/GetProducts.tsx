import {useEffect, useReducer} from "react";
import {getJsonProducts} from "../modules";

const initialState = {products: []}
const success = "Success"

function reducer(state: any, action: { type: any; products: any; }) {
    switch (action.type) {
        case success:
            return {
                products: action.products
            }
        default:
            return state
    }
}

export function GetProducts() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const url = `products/`

    useEffect(() => {
        getJsonProducts(url).then((result) => {
            dispatch({type: success, products: result})
        })
    }, [url])

    return state.products
}