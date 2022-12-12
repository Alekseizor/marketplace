export interface Product{
    UUID: string
    Price: number
    Image: string
    Name: string
    Description: string
}

export interface ICart {
    UUID: string
    StoreUUID: string
}

export interface IOrder {
    UUID: string
    Products: string[]
    UserUUID: string
    Date: string
    Status: string
}