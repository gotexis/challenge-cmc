import React from "react"
import ReactDOM from "react-dom"
import "./index.scss"
import App from "./App"
import { Provider } from "react-redux"
import { BaseProvider } from "./context/base"
import { BrowserRouter } from "react-router-dom"
import configureStore from "./store/index"

export const { store } = configureStore()

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.REACT_APP_URL_PREFIX}>
      <Provider store={store}>
        <BaseProvider>
          <App />
        </BaseProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,

  document.getElementById("root")
)
