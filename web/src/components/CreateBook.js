import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import firebase from '../firebase';
import { useHistory } from 'react-router-dom';

/*
    Componente com método de cadastro de novos livros
    Importa conexão com o backend de ../firebase
*/

export default function CreateBook() {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const authorRef = useRef();
  const barcodeRef = useRef();
  const imgSrcRef = useRef();

  const { currentUser } = useAuth();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const database = firebase.firestore();

  const booksCollection = database.collection('books');

  function eraseFields() {
    titleRef.current.value = '';
    descriptionRef.current.value = '';
    authorRef.current.value = '';
    barcodeRef.current.value = '';
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);

      await booksCollection.add({
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        author: authorRef.current.value,
        barcode: barcodeRef.current.value,
        imgSrc: imgSrcRef.current.value,
        owner: currentUser.uid,
        ownerEmail: currentUser.email,
        borrowedBy: '',
        isAvailable: true,
      });

      eraseFields();

      setSuccess('Successfully created!');
      setInterval(() => {
        setSuccess('');
      }, 3000);

      history.push('/');
    } catch (e) {
      setError('Error creating book');
      setInterval(() => {
        setError('');
      }, 3000);
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Create Book</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          {success && <Alert variant='success'>{success}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control type='text' ref={titleRef} required />
            </Form.Group>
            <Form.Group id='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control type='text' ref={descriptionRef} required />
            </Form.Group>
            <Form.Group id='author'>
              <Form.Label>Author</Form.Label>
              <Form.Control type='text' ref={authorRef} required />
            </Form.Group>
            <Form.Group id='barcode'>
              <Form.Label>Barcode</Form.Label>
              <Form.Control type='text' ref={barcodeRef} required />
            </Form.Group>
            <Form.Group id='imgSrc'>
              <Form.Label>Image Link</Form.Label>
              <Form.Control type='text' ref={imgSrcRef} required />
            </Form.Group>
            <Button disabled={loading} className='w-100' type='submit'>
              Create
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
