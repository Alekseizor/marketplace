import {useEffect, useReducer} from "react";
import {getJsonProduct} from "../modules";

const initialState = {product: ""}
const success = "Success"

function reducer(state: any, action: { type: any; product: any; }) {
    switch (action.type) {
        case success:
            return {
                product: action.product
            }
        default:
            return state
    }
}

export function GetProduct(uuid: string) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const url = `products/${uuid}`

    useEffect(() => {
        getJsonProduct(url).then((result) => {
            dispatch({type: success, product: result})
        })
    }, [url])

    return state.product
}