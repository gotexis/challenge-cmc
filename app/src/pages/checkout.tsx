import React, { useEffect } from "react"
import { useLocation } from "react-router"
import axios from "axios"
import styled from "styled-components"
import { useCart } from "../context/base"

const Checkout = () => {
  const {
    state: { country, rateConvertedResult }
  } = useLocation<{ country: string; rateConvertedResult: string }>()
  const { setCart } = useCart()

  const [submitting, setSubmitting] = React.useState(false)
  const [result, setResult] = React.useState<any>(null)

  useEffect(() => {
    const _ = async () => {
      try {
        setSubmitting(true)
        const { data } = await axios.post("http://localhost:4000/product/checkout", {
          country,
          rateConvertedResult
        })
        setResult(data)
        setCart([])
      } catch (e: any) {
        setResult(e?.response?.data)
      }
      setSubmitting(false)
    }
    _()
  }, [rateConvertedResult])

  if (submitting) return <>Submitting...</>

  return (
    <Center>
      Thanks for checking out! Your result is:
      <Box>{result && JSON.stringify(result)}</Box>
    </Center>
  )
}

const Box = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 20px;
`

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
`

export default Checkout
