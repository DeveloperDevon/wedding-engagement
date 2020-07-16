import React, { useContext } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import Rsvp from './pages/Rsvp'
import { AuthContext } from './contexts/auth'

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => !!authenticated
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
    />
  )
}

const AppRouter = () => {
  const auth = useContext(AuthContext)
  if (!auth || auth?.loading) return <div>Loading...</div>
  if (auth?.error) return <div>Error {auth.error}</div>

  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/rsvp" authenticated={!!auth?.user} component={Rsvp}></PrivateRoute>
        <Route path="/gallery" component={Gallery} />
        <Route exact path="/" component={Home}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default AppRouter