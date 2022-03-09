import React, { useEffect, useState } from "react"
import axios from "axios"
import styled from "styled-components"
import { Product } from "@starter/common/models"
import { useCart } from "../context/base"

const ProductList = () => {
  const { cart, addToCart, removeFromCart } = useCart()
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const _ = async () => {
      const { data } = await axios.get<Product[]>("http://localhost:4000/product/")
      setProducts(data)
    }
    _().then()
  }, [])

  return (
    <div>
      <Flex>
        {products.map((p) => (
          <ProductCard key={p.id}>
            <img src={p.img} alt={p.title} />
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <button onClick={() => addToCart(p)}>Add to cart</button>
            <p>Price: {p.price} AUD</p>
          </ProductCard>
        ))}
      </Flex>
    </div>
  )
}

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem;
`

const ProductCard = styled.div`
  width: calc(33% - 4rem);
  margin: 10px 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  img {
    width: 100%;
  }

  button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background: #0070f3;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
  }
`

export default ProductList
