import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const [q, setQ] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { admin, logout } = useAuth();

  const onSearch = (e) => {
    e.preventDefault();
    if (q.trim()) navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <header className="navbar">
      <div className="wrap navinner">
        <Link to="/" className="brand">
          <span className="brand-mark" aria-hidden="true">B</span>
          Bookish<span>Verse</span>
        </Link>
        <nav className={`navlinks${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          <Link to="/books" onClick={() => setMenuOpen(false)}>Books</Link>
          <Link to="/categories" onClick={() => setMenuOpen(false)}>Categories</Link>
          <Link to="/articles" onClick={() => setMenuOpen(false)}>Journal</Link>
          <Link className="mobile-nav-item" to={admin ? '/admin/dashboard' : '/admin/login'} onClick={() => setMenuOpen(false)}>
            {admin ? 'Dashboard' : 'Admin'}
          </Link>
          {admin && (
            <button className="mobile-nav-item mobile-logout" type="button" onClick={() => { logout(); setMenuOpen(false); }}>
              Log out
            </button>
          )}
        </nav>
        <form className="searchbox" onSubmit={onSearch} role="search">
          <input aria-label="Search books" placeholder="Search books..." value={q} onChange={(e) => setQ(e.target.value)} />
        </form>
        {admin ? (
          <div className="navright">
            <Link to="/admin/dashboard" className="btn btn-ghost">Dashboard</Link>
            <button className="btn btn-ghost" onClick={logout}>Log out</button>
          </div>
        ) : (
          <Link to="/admin/login" className="btn btn-ghost admin-link">Admin</Link>
        )}
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
