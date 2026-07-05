export default function Contact({ fiverrLink }) {
  return (
    <section id="contact" className="panel" style={{ textAlign: 'center', padding: '60px 20px' }}>
      <h3 style={{ marginBottom: '16px' }}>Let's Work Together</h3>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 32px' }}>
        Have a project in mind? Reach out and let's create something great together. I typically respond within a few hours.
      </p>
      
      <div className="hero-actions" style={{ justifyContent: 'center', gap: '20px' }}>
        <a href="mailto:jeniston777@gmail.com" className="btn secondary" style={{ fontSize: '1.1rem', padding: '12px 32px' }}>
          jeniston777@gmail.com
        </a>
        <a className="btn secondary" href={fiverrLink} target="_blank" rel="noreferrer" style={{ fontSize: '1.1rem', padding: '12px 32px' }}>
          Hire me on Fiverr
        </a>
      </div>
    </section>
  );
}
