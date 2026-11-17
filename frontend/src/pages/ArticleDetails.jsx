import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import Loading from '../components/Loading.jsx';
import SEO from '../components/SEO.jsx';

export default function ArticleDetails() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    api.get(`/articles/${id}`).then((r) => setArticle(r.data)).catch(() => setArticle(false));
  }, [id]);

  if (article === false) return <main className="wrap block"><p>Article not found.</p></main>;
  if (!article) return <main className="wrap block"><Loading /></main>;

  return (
    <main className="wrap block">
      <SEO title={article.title} description={article.content.slice(0, 155)} />
      {article.category?.name && <p className="tag">{article.category.name}</p>}
      <h1>{article.title}</h1>
      <p className="muted">By {article.author?.name || 'BookishVerse'}{article.publishedAt ? ` · ${new Date(article.publishedAt).toLocaleDateString()}` : ''}</p>
      <article className="article-content">{article.content}</article>
    </main>
  );
}
