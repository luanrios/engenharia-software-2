import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Library from './Library';

export default function ListBorrowedBooks() {
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
