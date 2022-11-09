import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <p className="navbar-brand">Inventory</p>

      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link">
            Products
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/equipment" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/eng4900" className="nav-link">
            Register
          </Link>
        </li>
        <li className="nav-item">
					<Link to="/eng4844" className="nav-link">
						Eng 4844
					</Link>
				</li> 
      </ul>
    </nav>
  );
}

export default Header;
