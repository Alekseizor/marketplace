import {addOrder} from "../modules";

export function AddOrder(product_uuid: string[]) {

    const url = `orders`

    function Add() {
        addOrder(url, product_uuid)
    }


    return (
        <>
            <button className="rounded-full bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={() => Add()}>Приобрести</button>
        </>
    );

}