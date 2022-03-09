import React from "react"
import { render, screen } from "@testing-library/react"
import App from "./App"
import { BrowserRouter } from "react-router-dom"

test("renders main", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
  const el = screen.getByText(/main/i)
  expect(el).toBeInTheDocument()
})
