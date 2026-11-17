import SearchBar from './SearchBar.jsx';

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="wrap hero-inner">
        <p className="eyebrow"><span /> A little more wisdom, every day</p>
        <h1>Big ideas.<br /><em>Made memorable.</em></h1>
        <p className="hero-copy">Thoughtful, original summaries of the books that help you think clearer, work smarter, and live better.</p>
        <SearchBar />
        <p className="hero-note">Find your next idea in minutes, not hours.</p>
      </div>
    </section>
  );
}
