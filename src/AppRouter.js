import React, { useContext } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { AuthContext } from './contexts/auth'
import Admin from './pages/Admin'
import Gallery from './pages/Gallery'
import Home from './pages/Home'
import Rsvp from './pages/Rsvp'

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
        <PrivateRoute path="/rsvp" authenticated={!!auth?.auth} component={Rsvp} />
        <PrivateRoute path="/admin" authenticated={!!auth?.admin} component={Admin} />
        <Route path="/gallery" component={Gallery} />
        <Route exact path="/" component={Home}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default AppRouter