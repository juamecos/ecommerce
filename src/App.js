import React from "react"
import Header from "./components/Header"
import Homepage from "./pages/Hompepage"
import Registration from "./pages/Registration"

import "./default.scss"
import { Route, Switch } from "react-router"
import MainLayout from "./layouts/MainLayout"
import HomepageLayout from "./layouts/HomepageLayout"

function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          )}
        />
        <Route
          path="/registration"
          render={() => (
            <MainLayout>
              <Registration />
            </MainLayout>
          )}
        />
      </Switch>
    </div>
  )
}

export default App
