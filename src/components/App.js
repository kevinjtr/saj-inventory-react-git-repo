import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
// import HeaderHome from "./HeaderHome";
import Logout from './Logout';
import HomePage from './HomePage';
import ListProduct from './ListProduct';
import Home from './Home';
import AddProduct from './AddProduct';
import Eng4900 from './Eng4900';
import Equipment from './Equipment';
import Hra from './Hra';
import Employee from './Employee';
import Login from './Login';
import EditProduct from './EditProduct';
import Register from './Register';
import Eng4844 from './Eng4844';
// import Query from './Query';

import axios from 'axios';
//import Equipment from './equipments/Equipment';
//import Category from './categories/Category';

function App() {
	axios.defaults.baseURL = 'http://localhost:8080';
	return (
		<BrowserRouter>
			{/* <HeaderHome /> */}
			<Route
				exact
				path={'/'}
				render={() => {
					return window.location.replace('/home');
				}}
			/>
			{/* <Route path="/home" component={HomePage} /> */}
			<Route exact path="/home" component={Header} />
			<Route path="/home" component={Home} />
			{/* <Route path="/home" component={Home} /> */}
			{/* <Route exact path={'/products'}
              render={() => {
                return window.localStorage.getItem('token') !== 'undefined'
                  ? <Redirect to='./products' />
                  : <Redirect to='./login' />
              }} /> */}
			<Route exact path="/products" component={Header} />
			<Route exact path="/products" exact component={Home} />

			<Route path="/add" component={Header} />
			<Route path="/add" component={AddProduct} />

			<Route exact path="/equipment" component={Header} />
			<Route path="/equipment" component={Equipment} />
			
			<Route exact path="/eng4844" component={Header} />
			<Route path="/eng4844" component={Eng4844} />

			<Route exact path="/eng4900" component={Header} />
			<Route path="/eng4900" component={Eng4900} />

			<Route exact path="/hra" component={Header} />
			<Route path="/hra" component={Hra} />

			<Route exact path="/employee" component={Header} />
			<Route path="/employee" component={Employee} />
			
			{/* <Route path="/categories" component={Category} /> */}

			<Route path="/login" component={HomePage} />
			<Route path="/login" component={Login} />

			<Route path="/logout" component={Header} />
			<Route path="/logout" component={Logout} />

			<Route path="/register" component={HomePage} />
			<Route path="/register" component={Register} />

			<Route path="/edit/:id" component={Header} />
			<Route path="/edit/:id" component={EditProduct} />
		</BrowserRouter>
	);
}

export default App;
