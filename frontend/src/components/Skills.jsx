export default function Skills({ skills }) {
  return (
    <section id="skills">
      <h3 style={{ marginBottom: '20px' }}>Skills</h3>
      <div className="chips">
        {skills.map((skill) => (
          <span key={skill} className="chip">{skill}</span>
        ))}
      </div>
    </section>
  );
}
