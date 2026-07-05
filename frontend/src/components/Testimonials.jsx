import { useState } from 'react';

export default function Testimonials({ testimonials, onTestimonialAdded }) {
  const [author, setAuthor] = useState('');
  const [quote, setQuote] = useState('');
  const [status, setStatus] = useState('');

  const handleAddTestimonial = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, quote })
      });
      if (res.ok) {
        setStatus('Testimonial added successfully!');
        setAuthor('');
        setQuote('');
        if (onTestimonialAdded) onTestimonialAdded();
      } else {
        setStatus('Failed to add testimonial.');
      }
    } catch (err) {
      setStatus('Failed to add testimonial.');
    }
  };

  return (
    <section id="testimonials" className="panel">
      <h3>Testimonials</h3>
      {testimonials && testimonials.length > 0 ? (
        <div className="card-grid" style={{ marginBottom: '40px' }}>
          {testimonials.map((testimonial) => (
            <article key={testimonial._id || testimonial.author} className="info-card quote-card">
              <p>"{testimonial.quote}"</p>
              <strong>{testimonial.author}</strong>
            </article>
          ))}
        </div>
      ) : (
        <div className="info-card" style={{ textAlign: 'center', padding: '40px', marginBottom: '40px' }}>
          <p>I'm currently collecting testimonials from my recent clients.</p>
        </div>
      )}

      <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
        <h4>Leave a Testimonial</h4>
        <form onSubmit={handleAddTestimonial} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '500px' }}>
          <input 
            type="text" 
            placeholder="Your Name / Company" 
            required 
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-strong)', background: 'var(--bg-app)', color: 'var(--text-primary)' }}
          />
          <textarea 
            placeholder="Your Testimonial" 
            required 
            rows="3"
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-strong)', background: 'var(--bg-app)', color: 'var(--text-primary)', resize: 'vertical' }}
          ></textarea>
          <button type="submit" className="btn secondary" style={{ width: 'fit-content' }}>Submit Review</button>
          {status && <p style={{ fontSize: '0.9rem', color: 'var(--accent)' }}>{status}</p>}
        </form>
      </div>
    </section>
  );
}
