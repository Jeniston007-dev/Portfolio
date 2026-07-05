export default function Projects({ projects }) {
  return (
    <section id="projects" className="panel">
      <h3>Projects</h3>
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
    </section>
  );
}
