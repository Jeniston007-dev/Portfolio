export default function ServiceModal({ serviceTitle, projects, onClose }) {
  if (!serviceTitle) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
      backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 9999,
      display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px'
    }}>
      <div className="modal-content panel" onClick={e => e.stopPropagation()} style={{
        maxWidth: '800px', width: '100%', maxHeight: '80vh', overflowY: 'auto',
        position: 'relative', padding: '40px', background: 'var(--bg-primary)'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '20px', right: '20px', 
          background: 'none', border: 'none', color: 'var(--text-primary)', 
          fontSize: '1.5rem', cursor: 'pointer'
        }}>✕</button>

        <h3 style={{ marginBottom: '24px' }}>{serviceTitle} Projects</h3>

        {projects && projects.length > 0 ? (
          <div className="card-grid">
            {projects.map((project) => (
              <article key={project.title} className="info-card project-card">
                <div className="project-header">
                  <h4>{project.title}</h4>
                  <span className="project-stack">{project.stack}</span>
                </div>
                <p>{project.description}</p>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noreferrer" className="project-link">
                    View Project <span>→</span>
                  </a>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="info-card" style={{ textAlign: 'center', padding: '40px' }}>
            <p>There are currently no projects matching this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
