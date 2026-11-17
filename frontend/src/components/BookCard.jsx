import { Link } from 'react-router-dom';

export default function BookCard({ book }) {
  const authorName = book.author?.name || 'Unknown Author';
  const catName = book.category?.name || '';
  return (
    <Link to={`/books/${book._id}`} className="card book-card">
      <div className="cover">
        {book.coverImage && <img className="cover-image" src={book.coverImage} alt={`Cover of ${book.title}`} loading="lazy" />}
        {book.featured && <span className="badge">EDITOR'S PICK</span>}
        {!book.coverImage && <span className="cover-title">{book.title}</span>}
      </div>
      <div className="meta">
        <div className="cat">{catName}</div>
        <h3>{book.title}</h3>
        <div className="auth">{authorName}</div>
      </div>
    </Link>
  );
}
