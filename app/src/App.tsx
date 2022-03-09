import React from "react"
import "./index.scss"
import { Route, Switch } from "react-router"
import ProductList from "./pages/productList"
import Checkout from "./pages/checkout"
import Cart from "./pages/cart"
import styled from "styled-components"
import { Link as BaseLink } from "react-router-dom"
import { useCart } from "./context/base"

const App = () => {
  const { itemCount } = useCart()

  return (
    <>
      <Header>
        <Link to={"/"}>Home</Link>
        <Link to={"/cart"}>Cart {itemCount ? <CountCircle>{itemCount}</CountCircle> : null}</Link>
      </Header>
      <Switch>
        {/*  product list */}
        <Route path="/" exact component={ProductList} />

        <Route path="/cart" exact component={Cart} />

        <Route path="/checkout" component={Checkout} />
      </Switch>
    </>
  )
}

const Header = styled.header`
  background: #333;
  color: #fff;
  padding: 1rem;
  text-align: center;
`

const Link = styled(BaseLink)`
  color: #fff;
  text-decoration: none;
  margin-right: 1rem;
`

const CountCircle = styled.span`
  background: darkred;
  font-size: 0.8rem;
  border-radius: 50%;
  padding: 0.2rem;
`
export default App
