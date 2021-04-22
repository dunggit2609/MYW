import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router";
import AUTH from "constant/auth";
import { _LIST_LINK } from "constant/config";

PrivateRoute.propTypes = {};

function PrivateRoute({ component: Component, ...rest }) {
  const isLogin = !!localStorage.getItem(AUTH.TOKEN_KEY);
  console.log("private", Component);
  if (isLogin) {
    //gui request check token
    //con han => render component
    //het han => hien diaglog thong bao dang nhap lai
    // => handle click => redirect to login
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem(AUTH.TOKEN_KEY) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: _LIST_LINK.login, state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
