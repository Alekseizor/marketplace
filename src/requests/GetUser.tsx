import {useEffect, useReducer} from "react";
import {getToken} from "../modules";
import axios from "axios";
import {ENDPOINT} from "../App";

const initialState = {user: ""}
const success = "Success"

function reducer(state: any, action: { type: any; payload: any; }) {
    switch (action.type) {
        case success:
            return {
                user: action.payload
            }
        default:
            return state
    }
}

export function GetUser(uuid: string) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const url = `user/${uuid}`
    let access_token = getToken()

    useEffect(() => {
        axios.get(`${ENDPOINT}/${url}`, {withCredentials: true, headers: {
                "Authorization": `Bearer ${access_token}`
            }}).then(r => r.data).then((result) => {
            dispatch({type: success, payload: result})
        })
    }, [url])

    return state.user
}