import {CartProduct} from "./models";

export type CartCaculateRequest = {
    cart: CartProduct[]
    country: string
}

export type CartCaculateResponse = {
    totalPrice: number
    shipping: number
    total: number
}
