import {IOrder} from "../models";
import React, {createContext, useEffect, useReducer, useState} from "react";
import {orders_context} from "../context/context";
import {Order} from "./Order";
import {getToken} from "../modules";
import axios from "axios";
import {ENDPOINT} from "../App";
import {reducer} from "../requests/GetOrders";


export const MyContext = createContext(orders_context);


const initialState = {order: []}
const success = "Success"



export function OrderPage() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const url = `orders`
    let access_token = getToken()

    const [filter, setFilter] = useState(false);
    const [stDate, setStDate] = useState('');
    const handleChangeStDate = (event: { target: { value: any; }; }) => {
        setStDate(event.target.value);
    };
    const [endDate, setEndDate] = useState('');
    const handleChangeEndDate = (event: { target: { value: any; }; }) => {
        setEndDate(event.target.value);
    };
    const [status, setStatus] = useState('');
    const handleChangeStatus = (event: { target: { value: any; }; }) => {
        setStatus(event.target.value);
    };

    useEffect(() => {
        axios.get(`${ENDPOINT}/${url}`, {withCredentials: true, headers: {
                "Authorization": `Bearer ${access_token}`
            }, params:{start_date: stDate, end_date: endDate, status: status}}).then(r => r.data).then((result) => {
            dispatch({type: success, payload: result})
        })
    }, [])

    let showOrders = true
    if (state.order.length === 0) {
        showOrders = false
    }

    useEffect(() => {
        if (filter) {
            axios.get(`${ENDPOINT}/${url}`, {withCredentials: true, headers: {
                    "Authorization": `Bearer ${access_token}`
                }, params:{start_date: stDate, end_date: endDate, status: status}}).then(r => r.data).then((result) => {
                dispatch({type: success, payload: result})
            })
        } else {
            axios.get(`${ENDPOINT}/${url}`, {withCredentials: true, headers: {
                    "Authorization": `Bearer ${access_token}`
                }, params:{start_date: "", end_date: "", status: ""}}).then(r => r.data).then((result) => {
                dispatch({type: success, payload: result})
            })
        }
    }, [filter])


    return (
        <>
            <div className="bg-gray-100 min-h-screen">
                <div className="w-1/2 mx-auto">
                    <div className="grid grid-rows-2 grid-cols-3 justify-items-center">
                        <div>
                            <label htmlFor="first-name" className="block text-lg text-center font-medium text-gray-700">
                                Статус
                            </label>
                            <input
                                type="text"
                                onChange={handleChangeStatus}
                                value={status}
                                className="mt-1 block w-64 rounded-md border-gray-300 shadow-sm focus:border-indigo-400 focus:ring-indigo-400 sm:text-base"
                            />
                        </div>
                        <div>
                            <label htmlFor="first-name" className="block text-lg text-center font-medium text-gray-700">
                                С даты
                            </label>
                            <input
                                type="text"
                                onChange={handleChangeStDate}
                                value={stDate}
                                maxLength={10}
                                className="mt-1 block w-64 rounded-md border-gray-300 shadow-sm focus:border-indigo-400 focus:ring-indigo-400 sm:text-base"
                            />
                        </div>
                        <div>
                            <label htmlFor="first-name" className="block text-lg text-center font-medium text-gray-700">
                                По дату
                            </label>
                            <input
                                type="text"
                                onChange={handleChangeEndDate}
                                value={endDate}
                                maxLength={10}
                                className="mt-1 block w-64 rounded-md border-gray-300 shadow-sm focus:border-indigo-400 focus:ring-indigo-400 sm:text-base"
                            />
                        </div>
                        <button className="mt-5 col-span-3 border-2 border-slate-300 border-indigo-400 rounded-full" onClick={() => {setFilter(!filter)}}> {!filter && <p>Применить фильтр</p>}{filter && <p>Снять фильтр</p>} </button>
                    </div>
                </div>
                <div className="px-2 sm:px-0 pt-5 flex flex-col gap-0 mx-auto container">
                    <div className="border-2 border-slate-300 -mb-1 rounded py-2  grid grid-cols-4">
                        <p className="place-self-center text-lg font-bold">
                            Продукты
                        </p>
                        <p className="place-self-center text-lg font-bold">
                            Покупатель
                        </p>

                        <div className="place-self-center text-lg font-bold">
                            <p className="place-self-center text-lg font-bold">
                                Дата
                            </p>

                        </div>

                        <div className="place-self-center text-lg font-bold">
                            <p className="place-self-center text-lg font-bold">
                                Статус
                            </p>
                        </div>
                    </div>
                    {showOrders &&  state.order.map((order: IOrder, key: any) => {
                        return (
                            <MyContext.Provider value={order} key={key}>
                                <Order/>
                            </MyContext.Provider>
                        )
                    })}
                    {!showOrders && <h1 className="text-2xl text-center">Заказов нет!</h1>}
                </div>
            </div>
        </>
    )
}