import React, {useState} from "react"
import {Navbar} from "./Navbar";
import {AddingProduct} from "../requests/AddProduct";

export function AddProduct() {
    const [name, setName] = useState('');
    const handleChangeName = (event: { target: { value: any; }; }) => {
        setName(event.target.value);
    };

    const [price, setPrice] = useState(0);
    const handleChangePrice = (event: { target: { value: any; }; }) => {
        setPrice(Number(event.target.value));
    };

    const [description, setDescription] = useState('');
    const handleChangeDescription = (event: { target: { value: any; }; }) => {
        setDescription(event.target.value);
    };

    const [image, setImage] = useState('');
    const handleChangeImage = (event: { target: { value: any; }; }) => {
        setImage(event.target.value);
    };

    return(
        <>

            <div className="mt-10 sm:mt-0">
                <div className="md:gap-6">
                    <div className="px-4 ">
                        <h3 className="text-3xl mt-2 text-center font-medium leading-6 text-gray-900">Добавление нового продукта</h3>
                    </div>
                    <div className="mt-5  md:mt-0">
                        <form>
                            <div className="overflow-hidden shadow sm:rounded-md">
                                <div className="bg-white px-4 py-5 sm:p-6">
                                    <div className="grid grid-cols-5 grid-rows-4 gap-6">
                                        <div className="col-span-2">
                                            <label htmlFor="first-name" className="block text-base font-medium text-gray-700">
                                                Название
                                            </label>
                                            <input
                                                type="text"
                                                onChange={handleChangeName}
                                                value={name}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
                                            />
                                        </div>

                                        <div className="">
                                            <label htmlFor="first-name" className="block text-base font-medium text-gray-700">
                                                Цена
                                            </label>
                                            <input
                                                type="number"
                                                onChange={handleChangePrice}
                                                value={price}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
                                            />
                                        </div>

                                        <div className="col-span-2">
                                            <label htmlFor="first-name" className="block text-base font-medium text-gray-700">
                                                Ссылка на изображение
                                            </label>
                                            <input
                                                type="text"
                                                onChange={handleChangeImage}
                                                value={image}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
                                            />
                                        </div>

                                        <div className="col-span-5">
                                            <label htmlFor="first-name" className="block text-base font-medium text-gray-700">
                                                Описание
                                            </label>
                                            <input
                                                type="text"
                                                onChange={handleChangeDescription}
                                                value={description}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 text-center sm:px-6">
                                    {AddingProduct(name, price, description, image)}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}