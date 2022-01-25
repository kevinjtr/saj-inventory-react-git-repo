
import React from "react"
import { Route, Redirect } from "react-router-dom"
import { connect } from 'redux-bundler-react';

function PrivateRoute({component: Component, ...rest }) {
  const {userIsLoggedIn, userIsLoggedOut} = rest
console.log(rest)

  return (
    <Route
      {...rest}
      render={props => {
        return userIsLoggedIn ? <Component {...props} /> : userIsLoggedOut ? <Redirect to="/logout" /> : <Redirect to="/login" />
      }}
    ></Route>
  )
}

export default connect(
  'selectUserIsLoggedIn',
  'selectUserIsLoggedOut',
  PrivateRoute);