import React from "react"
import { Route, Redirect } from "react-router-dom"
import { connect } from 'redux-bundler-react';

function PrivateRoute({component: Component, ...rest }) {
  const {userIsLoggedIn, userIsLoggingOut, name} = rest

  console.log(name)
  if(name == 'login'){
    return (
      <Route
        {...rest}
        render={props => {
          return userIsLoggedIn ?  <Redirect to="/dashboard"/> : <Component {...props} />
        }}
      ></Route>
    )
  }

  return (
    <Route
      {...rest}
      render={props => {
        return userIsLoggedIn ? <Component {...props} /> : userIsLoggingOut ? <Redirect to="/logout" /> : <Redirect to="/login" />
      }}
    ></Route>
  )
}

export default connect(
  'selectUserIsLoggedIn',
  'selectUserIsLoggingOut',
  PrivateRoute);