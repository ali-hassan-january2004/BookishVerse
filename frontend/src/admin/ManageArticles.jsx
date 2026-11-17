import { useEffect, useState } from 'react';
import api from '../services/api';

export default function ManageArticles() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [form, setForm] = useState({ title: '', content: '', category: '', author: '' });
  const load = () => api.get('/articles/admin').then((r) => setArticles(r.data));

  useEffect(() => {
    load();
    api.get('/categories').then((r) => setCategories(r.data));
    api.get('/authors').then((r) => setAuthors(r.data));
  }, []);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const add = async (e) => {
    e.preventDefault();
    await api.post('/articles', form);
    setForm({ title: '', content: '', category: '', author: '' });
    load();
  };

  const remove = async (id) => {
    await api.delete(`/articles/${id}`);
    load();
  };

  return (
    <div>
      <form onSubmit={add} className="add-form">
        <input name="title" placeholder="Title" value={form.title} onChange={change} required />
        <select name="category" value={form.category} onChange={change} required>
          <option value="">Select category</option>
          {categories.map((category) => <option key={category._id} value={category._id}>{category.name}</option>)}
        </select>
        <select name="author" value={form.author} onChange={change} required>
          <option value="">Select author</option>
          {authors.map((author) => <option key={author._id} value={author._id}>{author.name}</option>)}
        </select>
        <textarea name="content" placeholder="Article content" value={form.content} onChange={change} required />
        <button className="btn btn-accent">Publish Article</button>
      </form>
      <table className="admin-table">
        <tbody>
          {articles.map((a) => (
            <tr key={a._id}>
              <td>{a.title}</td>
              <td>{a.status}</td>
              <td><button type="button" onClick={() => remove(a._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
