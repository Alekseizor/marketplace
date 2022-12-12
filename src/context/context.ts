import {Product} from "../models";
import {ICart, IOrder} from "../models";

export let product_context: Product = {
    UUID: "",
    Price: 0,
    Image: "",
    Name: "",
    Description: "",
}
export let cart_context: ICart = {
    UUID: "",
    StoreUUID: "",
}

export let orders_context: IOrder = {
    UUID: "",
    Products: [""],
    UserUUID: "",
    Date: "",
    Status: "",
}