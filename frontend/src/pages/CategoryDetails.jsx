import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import BookGrid from '../components/BookGrid.jsx';
import Loading from '../components/Loading.jsx';

export default function CategoryDetails() {
  const { id } = useParams();
  const [books, setBooks] = useState(null);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    setBooks(null);
    setCategory(null);
    Promise.all([api.get(`/books?category=${id}`), api.get('/categories')])
      .then(([booksResponse, categoriesResponse]) => {
        setBooks(booksResponse.data.books);
        setCategory(categoriesResponse.data.find((item) => item._id === id) || null);
      })
      .catch(() => setBooks([]));
  }, [id]);

  return (
    <main className="wrap block">
      <p className="tag">Browse the library</p>
      <h1>{category?.name || 'Category'}</h1>
      {category?.description && <p className="muted">{category.description}</p>}
      {books ? <BookGrid books={books} /> : <Loading />}
    </main>
  );
}
