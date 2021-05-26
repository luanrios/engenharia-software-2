import React, { useState } from "react";
import { Link } from "react-router-dom";
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
            {books.map(book => (
                <li key={book.title}>
                    {book.title}
                    <Link to={"/book/"+book.id+"/edit"} className="btn btn-primary">
                        Update
                    </Link>
                </li>
            ))}
        </ul>
        </>
    );
}