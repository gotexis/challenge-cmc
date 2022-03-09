import React from "react"
import styled from "styled-components"
import { Component } from "react"

const Box = ({ children }: { children: Component | any }) => <Root>{children}</Root>

const Root = styled.div`
  width: 100%;
`

export default Box
