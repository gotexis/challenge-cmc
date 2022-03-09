import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import { CartContext } from "./context/base"
import ProductList from "./pages/productList"
import axios from "axios"
import Cart from "./pages/cart"

describe("App", function () {
  it("renders product list", async () => {
    jest.spyOn(axios, "get").mockImplementationOnce(() => {
      return Promise.resolve({
        data: [
          {
            id: 1,
            title: "Product 1",
            description: "description 1",
            price: 1
          },
          {
            id: 2,
            title: "Product 2",
            description: "description 2",
            price: 2
          }
        ]
      } as any)
    })

    render(
      <CartContext.Provider
        value={
          {
            cart: [],
            addToCart: () => {},
            removeFromCart: () => {},
            clearCart: () => {}
          } as any
        }
      >
        <ProductList />
      </CartContext.Provider>
    )
    await waitFor(() => expect(screen.getByText(/description 1/i)).toBeInTheDocument())
    await waitFor(() => expect(screen.getByText(/product 2/i)).toBeInTheDocument())
  })

  it("renders empty carts", () => {
    render(
      <CartContext.Provider
        value={
          {
            cart: []
          } as any
        }
      >
        <Cart />
      </CartContext.Provider>
    )
    expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument()
  })

  it("renders carts with item", () => {
    render(
      <CartContext.Provider
        value={
          {
            cart: [
              {
                id: 1,
                title: "Product 1",
                description: "description 1",
                price: 1,
                quantity: 1
              }
            ]
          } as any
        }
      >
        <Cart />
      </CartContext.Provider>
    )
    expect(screen.getByText(/Product 1/i)).toBeInTheDocument()
    expect(screen.getByText(/Quantity/i)).toBeInTheDocument()
  })
})
