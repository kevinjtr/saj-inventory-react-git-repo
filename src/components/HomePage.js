import React from "react";
import { Button, Form, FormControl, Nav, Navbar } from "react-bootstrap";

function HomePage() {
  return (
    <Navbar bg="dark" expand="lg" >
      <Navbar.Brand href="/home" style={{color: 'white'}}>Inventory</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav justify variant="tabs">
        <Nav.Item>
          <Nav.Link href="/login" style={{color: 'white', position: 'auto'}}>Login</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/register" style={{color: 'white', float: 'right'}}>Register</Nav.Link>
        </Nav.Item>
        </Nav>
        {/* <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form> */}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default HomePage;
