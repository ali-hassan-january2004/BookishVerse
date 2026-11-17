import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  return (
    <form
      className="hero-search"
      onSubmit={(e) => {
        e.preventDefault();
        if (q.trim()) navigate(`/search?q=${encodeURIComponent(q)}`);
      }}
    >
      <input aria-label="Search book summaries" placeholder='Try "habits" or "Sapiens"...' value={q} onChange={(e) => setQ(e.target.value)} />
      <button className="btn btn-accent" type="submit">Explore</button>
    </form>
  );
}
