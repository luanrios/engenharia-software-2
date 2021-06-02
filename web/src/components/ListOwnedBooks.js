import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Library from './Library';

export default function ListOwnedBooks() {
  const { currentUser } = useAuth();

  return (
    <>
      <br />

      <Library
        filterBook={book => {
          return book.owner === currentUser.uid;
        }}
      />
    </>
  );
}
