export default function Hero({ name, headline, fiverrLink }) {
  return (
    <section className="hero panel">
      <div>
        <h1>{name}</h1>
        <p className="hero-copy">{headline}</p>
        <div className="hero-actions">
          <a className="btn primary" href="#contact">Get in touch</a>
          <a className="btn secondary" href={fiverrLink} target="_blank" rel="noreferrer">Visit Fiverr</a>
        </div>
      </div>
      <div className="hero-image-container">
        <img 
          className="hero-avatar-image" 
          src="/profile.jpg" 
          alt="Avatar" 
        />
      </div>
    </section>
  );
}
