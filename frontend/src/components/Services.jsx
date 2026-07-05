export default function Services({ services, onServiceClick }) {
  return (
    <section id="services" className="panel">
      <h3>Services</h3>
      <div className="card-grid">
        {services.map((service) => (
          <article 
            key={service.title} 
            className="info-card service-card"
            style={{ cursor: 'pointer', transition: 'transform 0.2s ease, border-color 0.2s ease' }}
            onClick={() => onServiceClick(service.title)}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <h4>{service.title}</h4>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
