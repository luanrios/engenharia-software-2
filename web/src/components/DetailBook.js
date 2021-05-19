import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import firebase from "../firebase";

export default function DetailBook(props) {
  const titleRef = useRef();
  const authorRef = useRef();
  const barcodeRef = useRef();
  
  const { currentUser } = useAuth();
  
  const [book, setBook] = useState(undefined);
  const [error, setError] = useState("");

  const database = firebase.firestore();
  const booksCollection = database.collection("books")
  
  useEffect(() => {
    getBook(props.match.params.id);
  }, []);

  async function getBook(id) {
    const doc = await booksCollection.doc(id).get();
    
    if (!doc.exists) {
      setError('Book not found');
      return;
    }

    setBook(doc.data());
  }

  function displayBook() {
    return (
      <>
        <h2 className="text-center mb-4">{book.title}</h2>
        <p className="text-center mb-4">Author: {book.author}</p>
        <p className="text-center mb-4">Owner: {book.owner}</p>
        
        <Card.Body>
          <Button disabled={!book.isAvailable || book.borrowedBy} className="w-100" onClick={handleBorrow}>
            Borrow
          </Button>
        </Card.Body>
        
        <Card.Body>
          <Button disabled={currentUser.email != book.owner} className="w-100" onClick={handleEdit}>
            Edit
          </Button>
        </Card.Body>
        
      </>
    );
  }

  async function handleBorrow(e) {
    e.preventDefault();
  }

  async function handleEdit(e) {
    e.preventDefault();
  }

  return (
    <>
      <Card>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {book && displayBook()}
          {!book && !error && <Alert variant="info">Fetching book...</Alert>}
        </Card.Body>
      </Card>
    </>
  );
}
