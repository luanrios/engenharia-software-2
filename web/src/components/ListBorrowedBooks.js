import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import firebase from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import Library from './Library';

export default function ListBooks() {
  const { currentUser } = useAuth();

  return (
    <>
      <br />

      <Library
        filterBook={book => {
          return book.borrowedBy === currentUser.uid;
        }}
      />
    </>
  );
}
