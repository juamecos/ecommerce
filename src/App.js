import React, { Component } from "react"
import { Route, Switch, Redirect } from "react-router"
import { auth, handleUserProfile } from "./firebase/utils"
//Layouts
import MainLayout from "./layouts/MainLayout"
import HomepageLayout from "./layouts/HomepageLayout"

// Pages
import Homepage from "./pages/Hompepage"
import Registration from "./pages/Registration"
import Login from "./pages/Login"

//styles
import "./default.scss"

const initialState = {
  currentUser: null,
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { ...initialState }
    console.log(props)
  }

  authListener = null

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth)
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data(),
            },
          })
        })
      }
      this.setState({
        ...initialState,
      })
    })
  }

  componentWillUnmount() {
    this.authListener()
  }

  render() {
    const { currentUser } = this.state
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <HomepageLayout currentUser={currentUser}>
                <Homepage />
              </HomepageLayout>
            )}
          />
          <Route
            path="/registration"
            render={() => (
              <MainLayout currentUser={currentUser}>
                <Registration />
              </MainLayout>
            )}
          />
          <Route
            path="/login"
            render={() =>
              currentUser ? (
                <Redirect to="/" />
              ) : (
                <MainLayout currentUser={currentUser}>
                  <Login />
                </MainLayout>
              )
            }
          />
        </Switch>
      </div>
    )
  }
}

export default App
