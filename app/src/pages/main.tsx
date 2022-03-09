import React, { useEffect, useState } from "react"
import Box from "../components/Box"
import axios from "axios"

const Main = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const _ = async () => {
      const { data } = await axios.get("http://localhost:4000/ping/")
      setState(JSON.stringify(data))
    }
    _().then()
  }, [])
  return (
    <div>
      <Box>main</Box>
      <div>{state}</div>
    </div>
  )
}

export default Main
