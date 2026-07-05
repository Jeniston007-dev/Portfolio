export default function About({ intro, stats }) {
  return (
    <section id="about" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h3>About</h3>
      <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>{intro}</p>
      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
