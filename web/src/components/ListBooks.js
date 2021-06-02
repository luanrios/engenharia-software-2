import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import firebase from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import Library from './Library';

export default function ListBooks() {
  const { currentUser, logout } = useAuth();
  const [books, setBooks] = React.useState([]);
  // const [loading, setLoading] = useState(false);

  // const database = firebase.firestore();
  // const booksCollection = database.collection("books");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await booksCollection.get();
  //     setBooks(data.docs.map(doc => {
  //         return { ...doc.data(), id: doc.id, isOwner: doc.data().owner === currentUser.email };
  //     }));
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      {/* <ul> */}
      <Link to='/book/create' className='btn btn-primary w-100 mt-3 mb-3'>
        Create New Book
      </Link>

      <br />

      <Library
        filterBook={book => {
          return book.isAvailable && !book.borrowedBy;
        }}
      />
      {/* <Table striped bordered hover>
          <thead>
            <tr>
              <th>Book</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index}>
                <td>{book.title}</td>
                <td>
                {
                  book.isOwner && (
                  <Link to={"/book/"+book.id+"/edit"} className="btn btn-primary">
                    Update
                  </Link>
                  )
                }
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ul> */}
    </>
  );
}
