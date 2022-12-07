import {Product} from "../models";
import {ICart} from "../models";

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