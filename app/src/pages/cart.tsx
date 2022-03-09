import React, { useEffect, useState } from "react"
import { useCart } from "../context/base"
import styled from "styled-components"
import axios from "axios"
import { fx } from "@starter/common/fx"
import { CartCaculateResponse } from "@starter/common/cart"

const Cart = () => {
  const { cart, addToCart, removeOneFromCart, removeFromCart } = useCart()
  const [country, setCountry] = useState<string>("AU")
  const { code, currencyFormatter, rate } = fx.find((c) => c.code === country) || {}
  const [checkoutResult, setCheckoutResult] = useState<CartCaculateResponse | null>(null)
  const rateConvertedResult =
    checkoutResult && currencyFormatter && rate
      ? Object.fromEntries(Object.entries(checkoutResult).map(([key, value]) => [key, currencyFormatter(value * rate)]))
      : null

  useEffect(() => {
    const _ = async () => {
      const { data } = await axios.post<CartCaculateResponse>("http://localhost:4000/product/cart", {
        cart,
        country
      })
      setCheckoutResult(data)
    }
    _()
  }, [cart])

  return (
    <div style={{ maxWidth: 900, margin: "auto" }}>
      <div style={{ textAlign: "center" }}>
        <label style={{ marginRight: 10 }}>Country</label>
        <CountrySelect value={country} onChange={(e) => setCountry(e.target.value)}>
          {fx.map((c) => (
            <option key={c.code}>{c.code}</option>
          ))}
        </CountrySelect>
      </div>

      <CartList>
        {!cart.length && (
          <EmptyCart>
            Your cart is empty :)
            <br />
            Go shopping!
          </EmptyCart>
        )}
        {cart.map((item) => (
          <CartCard key={item.id}>
            <img src={item.img} />
            <h3>{item.title}</h3>
            <hr />
            <p>Price: {item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Subtotal: {item.price * item.quantity}</p>
            <Row>
              <Btn onClick={() => addToCart(item)}>Add 1</Btn>
              <Btn red onClick={() => removeOneFromCart(item)}>
                Remove 1
              </Btn>
              <Btn red onClick={() => removeFromCart(item)}>
                Remove All
              </Btn>
            </Row>
          </CartCard>
        ))}
      </CartList>

      {rateConvertedResult && (
        <Box>
          <h3>Total: {rateConvertedResult.totalPrice}</h3>
          <h3>Shipping: {rateConvertedResult.shipping}</h3>
          <h3>Grand Total: {rateConvertedResult.total}</h3>
        </Box>
      )}
    </div>
  )
}

const Box = styled.div`
  padding: 20px;
  background: #f5f5f5;
  border-radius: 5px;
`

const CountrySelect = styled.select`
  width: 100%;
  max-width: 200px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  margin: 20px auto 20px;
`

const EmptyCart = styled.div`
  text-align: center;
  font-size: 1.5rem;
  margin-top: 2rem;
  width: 100%;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const CartCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  padding: 1rem;
  border: 1px solid black;
  border-radius: 5px;
  background-color: #f5f5f5;
`

const Btn = styled.button<{ red?: boolean }>`
  margin-top: 1rem;
  margin-right: 3px;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: ${({ red }) => (red ? "darkred" : "#0070f3")};
  color: #fff;
  font-weight: 600;
  cursor: pointer;
`

const CartList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export default Cart
