import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import firebase from "../firebase";
import { useAuth } from "../contexts/AuthContext";

export default function ListBooks() {

    const { currentUser, logout } = useAuth();
    const [books, setBooks] = React.useState([]);
    // const [loading, setLoading] = useState(false);

    const database = firebase.firestore();
    const booksCollection = database.collection("books");

    React.useEffect(() => {
        const fetchData = async () => {
          const data = await booksCollection.get();
          setBooks(data.docs.map(doc => {
                return { ...doc.data(), id: doc.id, isOwner: doc.data().owner === currentUser.email };
          }));
        };
        fetchData();
      }, []);

    return (
        <>
        <ul>
            <Link to="/book/create" className="btn btn-primary w-100 mt-3">
                Create New Book
            </Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Book</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.title}>
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
        </ul>
        </>
    );
}