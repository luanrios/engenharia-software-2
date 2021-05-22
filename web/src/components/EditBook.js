import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import firebase from "../firebase";

/*
    Componente de edição de livros
    Importa backend de ../firebase
*/

export default function CreateBook(props) {
  const titleRef = useRef();
  const authorRef = useRef();
  const barcodeRef = useRef();

  const { currentUser } = useAuth();
  
  const [owner, setOwner] = useState("");
  const [error, setError] = useState("");
  const [doesBookExist, setDoesBookExist] = useState(true);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  
  useEffect(() => {
    if (!doesBookExist) {
      history.push('/');
    }
  }, [doesBookExist, history])

  useEffect(() =>{
    function fillFields(bookData) {
      titleRef.current.value = bookData.title;
      authorRef.current.value = bookData.author;
      barcodeRef.current.value = bookData.barcode;

      setOwner(bookData.owner);
    }

    async function getBook(id) {
      const database = firebase.firestore();
      const booksCollection = database.collection("books");
      
      const doc = await booksCollection.doc(id).get();
      
      if (!doc.exists) {
        return setDoesBookExist(false);
      }

      const bookData = doc.data();

      fillFields(bookData);
    }
    
    let bookData = props.location.state ? props.location.state.book : undefined;

    if (!bookData) {
      getBook(props.match.params.id);
    } else {
      fillFields(bookData);
    }
  }, [props])

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const database = firebase.firestore();
      const booksCollection = database.collection("books")
  
      setError("");
      setLoading(true);

      if (owner !== currentUser.email) {
        throw new Error('User does not own book');
      }

      await booksCollection.doc(props.match.params.id).update({
        title: titleRef.current.value,
        author: authorRef.current.value,
        barcode: barcodeRef.current.value
      });

      setSuccess("Successfully updated!");
      setInterval(() => {
        setSuccess("");
      }, 3000)
    } catch(e) {
      setError("Error updating book");
      setInterval(() => {
        setError("");
      }, 3000)
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Book</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" ref={titleRef} required />
            </Form.Group>
            <Form.Group id="author">
              <Form.Label>Author</Form.Label>
              <Form.Control type="text" ref={authorRef} required />
            </Form.Group>
            <Form.Group id="barcode">
              <Form.Label>Barcode</Form.Label>
              <Form.Control type="text" ref={barcodeRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
