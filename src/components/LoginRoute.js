
import React from "react"
import { Route, Redirect } from "react-router-dom"
import { connect } from 'redux-bundler-react';

function LoginRoute({component: Component, ...rest }) {
const {userIsLoggedIn} = rest

  return (
    <Route
      {...rest}
      render={props => {
        return userIsLoggedIn ?  <Redirect to="/dashboard"/> : <Component {...props} />
      }}
    ></Route>
  )
}

export default connect(
    'selectUserIsLoggedIn',
    LoginRoute);