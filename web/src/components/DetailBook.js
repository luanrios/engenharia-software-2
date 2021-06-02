import React, { useState, useEffect } from 'react';
import { Button, Card, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import firebase from '../firebase';

/*
    Componente de visualização detalhada de um livro
    Importa conexão com o backend de ../firebase
*/

export default function DetailBook(props) {
  const { currentUser } = useAuth();

  const [book, setBook] = useState(undefined);
  const [error, setError] = useState('');

  const history = useHistory();

  useEffect(() => {
    async function getBook(id) {
      const database = firebase.firestore();
      const booksCollection = database.collection('books');

      const doc = await booksCollection.doc(id).get();

      if (!doc.exists) {
        setError('Book not found');
        return;
      }

      setBook({ ...doc.data(), id: doc.id });
    }

    getBook(props.match.params.id);
  }, [props]);

  function displayBook() {
    return (
      <>
        <h2 className='text-center mb-4'>{book.title}</h2>
        <p className='text-center mb-4'>
          {book.description || 'No description available'}
        </p>
        <p className='text-center mb-4'>Author: {book.author}</p>
        <p className='text-center mb-4'>Owner: {book.owner}</p>

        {book.isAvailable && !book.borrowedBy ? (
          <Card.Body>
            <Button className='w-100' onClick={handleBorrow}>
              Borrow
            </Button>
          </Card.Body>
        ) : (
          <></>
        )}

        {book.borrowedBy === currentUser.uid ? (
          <Card.Body>
            <Button className='w-100' onClick={handleReturn}>
              Return
            </Button>
          </Card.Body>
        ) : (
          <></>
        )}

        {currentUser.email === book.owner ? (
          <Card.Body>
            <Button className='w-100' onClick={handleEdit}>
              Edit
            </Button>
          </Card.Body>
        ) : (
          <></>
        )}

        {currentUser.email === book.owner ? (
          <Card.Body>
            <Button className='w-100' onClick={handleDelete}>
              Delete
            </Button>
          </Card.Body>
        ) : (
          <></>
        )}
      </>
    );
  }

  async function handleBorrow(e) {
    e.preventDefault();

    const database = firebase.firestore();

    const bookCollection = database.collection('books');
    const userCollection = database.collection('users');

    const userDoc = await userCollection.doc(currentUser.uid).get();
    const userData = userDoc.data();

    await userCollection.doc(currentUser.uid).update({
      borrowedBooks: [...userData.borrowedBooks, book.id],
    });

    // TODO: borrowedBy field should use current user id
    await bookCollection.doc(props.match.params.id).update({
      borrowedBy: currentUser.uid,
      isAvailable: false,
    });

    history.push('/');
  }

  async function handleReturn(e) {
    e.preventDefault();

    const database = firebase.firestore();

    const bookCollection = database.collection('books');
    const userCollection = database.collection('users');

    const userDoc = await userCollection.doc(currentUser.uid).get();
    const userData = userDoc.data();

    await userCollection.doc(currentUser.uid).update({
      borrowedBooks: userData.borrowedBooks.filter(value => value !== book.id),
    });

    // TODO: borrowedBy field should use current user id
    await bookCollection.doc(props.match.params.id).update({
      borrowedBy: '',
      isAvailable: true,
    });

    history.push('/');
  }

  async function handleEdit(e) {
    e.preventDefault();

    history.push({
      pathname: `/book/${props.match.params.id}/edit`,
      state: { book },
    });
  }

  async function handleDelete(e) {
    e.preventDefault();

    if (!book) {
      return;
    }

    if (book.owner !== currentUser.email) {
      setError("User doesn't own book");
      setInterval(() => {
        setError('');
      }, 3000);
      return;
    }

    try {
      const database = firebase.firestore();
      const booksCollection = database.collection('books');

      await booksCollection.doc(props.match.params.id).delete();

      history.push('/');
    } catch (e) {
      setError('Error deleting book');
      setInterval(() => {
        setError('');
      }, 3000);
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          {error && <Alert variant='danger'>{error}</Alert>}
          {book && displayBook()}
          {!book && !error && <Alert variant='info'>Fetching book...</Alert>}
        </Card.Body>
      </Card>
    </>
  );
}
