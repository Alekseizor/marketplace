import {loginUser} from "../modules";
import React from "react";


export function LoginUser(name: string, pass: string) {
    const url = `login`

    function Login() {
        loginUser(url, name, pass)
        console.log(name)
        console.log(pass)
    }


    return (
        <>
            <button
                className="w-full text-center px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-fuchsia-700 rounded-md hover:bg-fuchsia-700 focus:outline-none focus:bg-fuchsia-700"
                onClick={() => Login()}
            >
                Войти
            </button>
        </>

    );

}