import React, {useState} from 'react';
import {LoginUser} from "../requests/LoginUser";
import {useCookies} from "react-cookie";


export function LoginPage() {
    const [cookies, setCookie, removeCookie] = useCookies(['tooken']);

    const [name, setName] = useState('');

    const handleChangeName = (event: { target: { value: any; }; }) => {
        setName(event.target.value);

    };
    const [pass, setPass] = useState('');

    const handleChangePass = (event: { target: { value: any; }; }) => {
        setPass(event.target.value);
    };
    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-fuchsia-700">
                    Войти
                </h1>
                <form className="mt-6">
                    <div className="mb-2">
                        <label
                            htmlFor="login"
                            className="block text-sm font-semibold text-fuchsia-700"
                        >
                            Login
                        </label>
                        <input
                            type="login"
                            onChange={handleChangeName}
                            value={name}
                            className="block w-full px-4 py-2 mt-2 text-neutral-900 bg-white border rounded-md focus:border-fuchsia-700 focus:ring-fuchsia-700 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-fuchsia-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            onChange={handleChangePass}
                            value={pass}
                            className="block w-full px-4 py-2 mt-2 text-neutral-900 bg-white border rounded-md focus:border-fuchsia-700 focus:ring-fuchsia-700 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                </form>
                <div className="mt-6">
                    {LoginUser(name, pass)}
                </div>

                <p className="mt-8 text-xl font-light text-center text-fuchsia-700">
                    {" "}
                    Отсутствует аккаунт?{" "}
                    <a
                        href="/registration"
                        className="font-medium text-fuchsia-700 text-xl hover:underline"
                    >
                        Зарегестрироваться
                    </a>
                </p>
            </div>
        </div>
    );
}