import React from "react"
import ReactDOM from "react-dom"
import "./index.scss"
import App from "./App"
import { CartProvider } from "./context/base"
import { BrowserRouter } from "react-router-dom"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.REACT_APP_URL_PREFIX}>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>,

  document.getElementById("root")
)
