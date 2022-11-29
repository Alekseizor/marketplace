export interface Product{
    UUID: string
    Price: number
    Image: string
    Name: string
    Description: string
}

export interface ICart {
    UUID: string
    Product: string
}