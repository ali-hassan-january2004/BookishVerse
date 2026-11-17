import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Books from './pages/Books.jsx';
import BookDetails from './pages/BookDetails.jsx';
import Categories from './pages/Categories.jsx';
import CategoryDetails from './pages/CategoryDetails.jsx';
import Articles from './pages/Articles.jsx';
import ArticleDetails from './pages/ArticleDetails.jsx';
import SearchResults from './pages/SearchResults.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import { useAuth } from './context/AuthContext.jsx';
import Loading from './components/Loading.jsx';

function Protected({ children }) {
  const { admin, loading } = useAuth();
  if (loading) return <main className="wrap block"><Loading /></main>;
  return admin ? children : <Navigate to="/admin/login" replace />;
}

function NotFound() {
  return (
    <main className="wrap block">
      <p className="eyebrow">404 · Page not found</p>
      <h1>Looks like this page is still a draft.</h1>
      <p className="muted">The page may have moved, or the link may be incorrect.</p>
      <Link to="/" className="cta">Back to the library</Link>
    </main>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:id" element={<CategoryDetails />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:id" element={<ArticleDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard/*"
          element={
            <Protected>
              <AdminDashboard />
            </Protected>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
