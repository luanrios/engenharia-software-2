import React from 'react';
import { Navbar, NavDropdown } from 'react-bootstrap';
import { useAuth } from "../contexts/AuthContext";

import logo from '../assets/images/icon.png';
import bookbook from '../assets/images/bookbook.png';

export default function TopNavbar() {
  // const { currentUser } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" className="justify-content-between">
      <Navbar.Brand href="/">
        <img
          alt=""
          src={logo}
          width="40"
          height="32"
          className="d-inline-block align-top"
        />{' '}
        <img
          alt=""
          src={bookbook}
          width="139"
          height="32"
          className="d-inline-block align-top"
        />{' '}
      </Navbar.Brand>

      {/* TODO: GET DIS "RIGHT" ;) */}
      <NavDropdown title="Dropdown" id="basic-nav-dropdown" className="dropdown-menu-right">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Navbar>
  );
}