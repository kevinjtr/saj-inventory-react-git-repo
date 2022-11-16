import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App.js";
import {Provider} from 'redux-bundler-react'
//import cache from './components/utils/cache';
import createStore from './components/bundles'

//cache.getAll().then(initialData => {

  if (process.env.NODE_ENV !== "development") {
      console.log = function(){};//disable console.log
  }

  ReactDOM.render(<Provider store={createStore()}><App /></Provider>, document.getElementById("root"));
//})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
