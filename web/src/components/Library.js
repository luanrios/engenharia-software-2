import React from 'react';
import { CardDeck, Card } from 'react-bootstrap';

// import { Container } from './styles';

function Library() {
  const exampleBooks = [
    {
      imgSrc: 'https://m.media-amazon.com/images/I/51P8CCNS4kL.jpg',
      title: 'Clube da Luta',
      owner: 'tom@zera.com',
      isAvailable: true
    },
    {
      imgSrc: 'https://images-na.ssl-images-amazon.com/images/I/917IJDfk36L.jpg',
      title: 'Boa noite dá pum',
      owner: 'pedro@filo.com',
      isAvailable: true
    },
    {
      imgSrc: 'https://images-na.ssl-images-amazon.com/images/I/71OoF53v78L.jpg',
      title: 'Eldest',
      owner: 'dud@inha.com',
      isAvailable: false
    },
  ];
  return (
    <>
      <CardDeck>
        {exampleBooks.map((book, index) => (
          book.isAvailable ?
            <Card key={index}>
              <Card.Img variant="top" src={book.imgSrc} />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Entre em contato com <a href="mailto">{book.owner}</a></small>
              </Card.Footer>
            </Card> :
            <></>
        ))}
      </CardDeck>
    </>
  );
}

export default Library;