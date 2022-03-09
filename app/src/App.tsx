import React from "react"
import "./index.scss"
import { Switch, Route } from "react-router"
import Main from "./pages/main"
import Sub from "./pages/sub"

const App = () => {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/sub" component={Sub} />
    </Switch>
  )
}

export default App
