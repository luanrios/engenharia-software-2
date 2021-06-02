import { Link } from 'react-router-dom';
import Library from './Library';

export default function ListBooks() {
  return (
    <>
      <Link to='/book/create' className='btn btn-primary w-100 mt-3 mb-3'>
        Create New Book
      </Link>

      <br />

      <Library
        filterBook={book => {
          return book.isAvailable && !book.borrowedBy;
        }}
      />
    </>
  );
}
