import {routes_tabs} from './config/routes'
import React from 'react'
import { connect } from 'redux-bundler-react';

function Header(props) {
	const {user} = props

	//doFetchUserLevel()
	console.log(props)
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<p className="navbar-brand">Inventory</p>
			<ul className="navbar-nav">
                {routes_tabs(user)}
                
			</ul>
		</nav>
	);
}

export default connect(
	'selectUser',
	Header);

// import React from 'react';
// import { Link } from 'react-router-dom';
// //import {routes_config} from './config/routes'

// function Header() {
// 	return (
// 		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
// 			<p className="navbar-brand">Inventory</p>

			
// 			<ul className="navbar-nav">
// 				{/* <li className="nav-item">
// 					<Link to="/home" className="nav-link">
// 						Home
// 					</Link>
// 				</li> */}
// 				{/* {routes_tabs} */}

// 				<li className="nav-item">
// 					<Link to="/equipment" className="nav-link">
// 						Equipment
// 					</Link>
// 				</li>
// 				<li className="nav-item">
// 					<Link to="/hra" className="nav-link">
// 						HRA
// 					</Link>
// 				</li>
// 				<li className="nav-item">
// 					<Link to="/employee" className="nav-link">
// 						Employee
// 					</Link>
// 				</li>
// 				 <li className="nav-item">
// 					<Link to="/eng4900" className="nav-link">
// 						Eng 4900
// 					</Link>
// 				</li> 
// 				<li className="nav-item">
// 					<Link to="/eng4844" className="nav-link">
// 						Eng 4844
// 					</Link>
// 				</li>
// 				<li className="nav-item">
// 					<Link to="/findeng4844" className="nav-link">
// 						Find Eng 4844
// 					</Link>
// 				</li>
// 				<li className="nav-item">
// 					<Link to="/changehistory" className="nav-link">
// 						Change History
// 					</Link>
// 				</li>
// 			</ul>
// 		</nav>
// 	);
// }

// export default Header;
