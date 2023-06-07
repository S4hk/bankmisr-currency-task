import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../../assets/images/bmp-logo.png";
import { Link } from "react-router-dom";
const NavBar: React.FC = () => {
  return (
    <Navbar sticky="top" bg="primary" variant="dark">
      <Container>
        <Link to="/">
          <img
            src={logo}
            height="70"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Link>
        <Navbar.Toggle aria-controls="navbar-nav"/>
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
       
            <Nav.Link as={Link} to="/?amount=1&from=EUR&to=GBP">
            EUR-GBP
            </Nav.Link>
            <Nav.Link as={Link} to="/?amount=1&from=EUR&to=USD">
            EUR-USD
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
