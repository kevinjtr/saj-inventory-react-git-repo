import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App.js";
import {Provider} from 'redux-bundler-react'
import cache from './components/utils/cache';
import createStore from './components/bundles'
// import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

//const x = async () => await cache.keys()
//console.log(x)
//cache.getAll().then(initialData => {

   // Create the store to hold all of our data
   //const store = createStore(initialData);

    //if (initialData) {
      //console.log('starting with locally cache data:', initialData);
    //}
    

    cache.getAll().then(initialData => {
      if (initialData) {
        console.log('starting with locally cache data:', initialData)
      }
      ReactDOM.render(<Provider store={createStore(initialData)}><App /></Provider>, document.getElementById("root"));
    })


  //});



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
