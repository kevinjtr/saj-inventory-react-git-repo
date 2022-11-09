import React, { Component } from 'react';
//const root = process.env.REACT_APP_HOST
import { Link } from 'react-router-dom';
class NotFound extends Component {
  
  render() {
    //const backToHome = root;

    return (
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col text-center">
            <h3>Sorry that page is not here</h3>
            <Link to="/">
            Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default NotFound