export type Product = {
    id: number
    title: string
    description: string
    img: string
    price: number
}

export interface CartProduct extends Product {
    quantity: number
}