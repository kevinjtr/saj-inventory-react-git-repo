import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<p className="navbar-brand">Inventories</p>

			<ul className="navbar-nav">
				<li className="nav-item">
					<Link to="/home" className="nav-link">
						Home
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/equipment" className="nav-link">
						Equipment
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/eng4900" className="nav-link">
						Eng 4900
					</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Header;
