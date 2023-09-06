import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from "react";
import App from "./components/App.js";
import {Provider} from 'redux-bundler-react'
import createStore from './components/bundles'
import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById("root"));
if (process.env.NODE_ENV !== "development") {
    //console.log = function(){};//disable console.log
}

root.render(<Provider store={createStore()}><App /></Provider>);
