import React, { useState } from "react"
import { CartProduct, Product } from "@starter/common/models"
import { createContext, useContext } from "react"

export const cartInitState = {
  cart: [] as CartProduct[],
  addToCart: (product: Product | CartProduct) => {},
  removeOneFromCart: (product: CartProduct) => {},
  removeFromCart: (product: CartProduct) => {},
  setCart: (cart: CartProduct[]) => {},
  itemCount: 0
}

export const CartContext = createContext(cartInitState)

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<CartProduct[]>(cartInitState.cart)

  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0)

  const addToCart = (item: Product | CartProduct) => {
    if (cart.find((cartItem) => cartItem.id === item.id)) {
      setCart(
        cart.map((cartItem) => {
          if (cartItem.id === item.id) {
            cartItem.quantity++
          }
          return cartItem
        })
      )
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }
  }

  const removeOneFromCart = (item: CartProduct) => {
    setCart(
      cart
        .map((cartItem) => {
          if (cartItem.id === item.id) {
            cartItem.quantity--
          }
          return cartItem
        })
        .filter((cartItem) => cartItem.quantity > 0)
    )
  }

  const removeFromCart = (item: Product | CartProduct) => {
    setCart(cart.filter((cartItem) => cartItem.id !== item.id))
  }

  return (
    <CartContext.Provider
      value={{
        ...cartInitState,
        cart,
        addToCart,
        removeFromCart,
        removeOneFromCart,
        setCart,
        itemCount
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
