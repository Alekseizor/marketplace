import {Products} from "../repository/Product";
import {ProductShow} from "./Product";
import {useEffect, useState,createContext,useReducer} from "react";
import React from "react";
import {GetProducts} from "../requests/GetProducts";
import {reducer, success} from "../reducer";
import {Product} from "../models";
import {getJsonProducts} from "../modules";
import {product_context} from "../context/context";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import {Navbar} from "./Navbar";


export const MyContext = createContext(product_context);


export function HomePage() {
    const products = GetProducts()
    const [name, setName] = useState('')
    const filteredProducts = products.filter((product: { Name: string }) => {
        return product.Name.toLowerCase().includes(name.toLowerCase())
    })
    const [price, setPrice] = React.useState<number[]>([0,1000]);

    const minDistance = 50;

    const handleChange = (event: Event, newValue: number | number[], activeThumb: number) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        if (activeThumb === 0) {
            setPrice([Math.min(newValue[0], price[1] - minDistance), price[1]]);
        } else {
            setPrice([price[0], Math.max(newValue[1], price[0] + minDistance)]);
        }
    };

    const marks = [
        {
            value: 0,
            label: '0',
        },
        {
            value: 250,
            label: '250₽',
        },
        {
            value: 500,
            label: '500₽',
        },
        {
            value: 750,
            label: '750₽',
        },
        {
            value: 1000,
            label: '1000₽',
        },
    ];

    function valuetext(price: number) {
        return `${price}₽`;
    }
    return (
        <>
            <p></p>
            <div className="row justify-content-evenly">
                <Box sx={{ width: 300 }} className={"col-4"}>
                    <Slider
                        aria-label="Price filter"
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        value={price}
                        marks={marks}
                        onChange={handleChange}
                        disableSwap
                        step={50}
                        min={0}
                        max={1000}
                        color="secondary"
                    />
                </Box>
            <form className={"col-4"}>
                <input className="form-control me-2" type="search" placeholder="Поиск" aria-label="Поиск" onChange={(event) => setName(event.target.value)}/>
            </form>
            </div>
            <div className="container content offset-md-0">
                <div className="row">
                    <div className="col-md-10 offset-md-0 products">
                        <div className="row">
                            {filteredProducts.filter((product: { Price: number; }) => product.Price >= price[0] && product.Price <= price[1]).map((product: Product) => {
                                return (
                                    <MyContext.Provider value={product}>
                                        <ProductShow product={product}/>
                                    </MyContext.Provider>
                                )
                            })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}