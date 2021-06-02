import React from 'react';
import { Navbar, NavDropdown } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

import logo from '../assets/images/icon.png';
import bookbook from '../assets/images/bookbook.png';

export default function TopNavbar() {
  const { currentUser } = useAuth();

  return (
    <Navbar bg='dark' variant='dark' className='justify-content-around'>
      <Navbar.Brand href='/'>
        <img
          alt=''
          src={logo}
          width='40'
          height='32'
          className='d-inline-block align-top'
        />{' '}
        <img
          alt=''
          src={bookbook}
          width='139'
          height='32'
          className='d-inline-block align-top'
        />{' '}
      </Navbar.Brand>

      <NavDropdown title='Menu' id='basic-nav-dropdown'>
        {currentUser ? (
          <>
            <NavDropdown.Item href='/'>Books</NavDropdown.Item>
            <NavDropdown.Item href='/borrowed-books'>
              Borrowed Books
            </NavDropdown.Item>
            <NavDropdown.Item href='/owned-books'>Owned Books</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href='/edit-profile'>Profile</NavDropdown.Item>
          </>
        ) : (
          <>
            <NavDropdown.Item href='/login'>Login</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href='/signup'>Sign Up</NavDropdown.Item>
          </>
        )}
      </NavDropdown>
    </Navbar>
  );
}
