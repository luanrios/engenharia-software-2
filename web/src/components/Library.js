import React, { useEffect, useState } from 'react';
import { CardDeck, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import firebase from '../firebase';

function Library(props) {
  const [books, setBooks] = useState([]);

  const filterBook = props.filterBook
    ? props.filterBook
    : _ => {
        return true;
      };

  useEffect(() => {
    const fetchData = async () => {
      const database = firebase.firestore();
      const booksCollection = database.collection('books');

      const data = await booksCollection.get();

      setBooks(
        data.docs.map(doc => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        }),
      );
    };

    fetchData();
  }, []);

  return (
    <>
      <CardDeck>
        {books.map((book, index) =>
          filterBook(book) ? (
            <Card key={index} style={{ marginBottom: '2rem' }}>
              <Card.Img variant='top' src={book.imgSrc} />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
              </Card.Body>
              <Card.Footer>
                <Link
                  to={`/book/${book.id}`}
                  className='btn btn-primary w-100 mt-3 mb-3'
                >
                  See More...
                </Link>
              </Card.Footer>
            </Card>
          ) : (
            <></>
          ),
        )}
      </CardDeck>
    </>
  );
}

export default Library;
