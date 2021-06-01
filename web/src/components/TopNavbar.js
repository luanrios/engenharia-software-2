import React from 'react';
import { Navbar } from 'react-bootstrap';
import logo from '../assets/images/icon.png';
import bookbook from '../assets/images/bookbook.png';

function TopNavbar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">
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
    </Navbar>
  );
}

export default TopNavbar;