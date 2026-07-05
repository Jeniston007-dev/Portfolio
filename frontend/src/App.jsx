import { useEffect, useMemo, useState } from 'react';
import { profile } from '../../shared/profile.js';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Services from './components/Services.jsx';
import Projects from './components/Projects.jsx';
import Testimonials from './components/Testimonials.jsx';
import Contact from './components/Contact.jsx';
import ServiceModal from './components/ServiceModal.jsx';

function App() {
  const [projects, setProjects] = useState(profile.projects);
  const [testimonials, setTestimonials] = useState(profile.testimonials);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const fetchReviews = () => {
    fetch('https://portfolio-z2hy.onrender.com/api/reviews')
      .then(res => res.json())
      .then(data => setTestimonials(data))
      .catch(console.error);
  };

  useEffect(() => {
    document.title = "Portfolio";

    // Fetch dynamic data
    fetch('https://portfolio-z2hy.onrender.com/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(console.error);

    fetchReviews();
  }, []);

  const stats = useMemo(
    () => [
      { label: 'Focus areas', value: 'Flutter + MERN + WordPress' },
      { label: 'Availability', value: 'Open for new work' }
    ],
    []
  );



  const handleServiceClick = (serviceTitle) => {
    setSelectedFilter(serviceTitle);
  };

  const filteredProjects = selectedFilter
    ? projects.filter(p => {
      const searchTerms = [p.title, p.stack, p.description].join(' ').toLowerCase();
      let filterWord = selectedFilter.toLowerCase();
      if (filterWord === 'landing pages') filterWord = 'landing page';
      if (filterWord === 'e-commerce') filterWord = 'commerce';

      return searchTerms.includes(filterWord);
    })
    : [];

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">{profile.name}</div>
        <nav className="topnav">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#services">Services</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <Hero name={profile.name} headline={profile.headline} fiverrLink={profile.fiverrLink} />

        <section className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <About intro={profile.intro} stats={stats} />
          <Skills skills={profile.skills} />
        </section>

        <Services services={profile.services} onServiceClick={handleServiceClick} />
        <Projects projects={projects} />
        <Testimonials testimonials={testimonials} onTestimonialAdded={fetchReviews} />
        <Contact contactEmail={profile.contactEmail} fiverrLink={profile.fiverrLink} />
      </main>

      <ServiceModal
        serviceTitle={selectedFilter}
        projects={filteredProjects}
        onClose={() => setSelectedFilter(null)}
      />

    </div>
  );
}

export default App;
