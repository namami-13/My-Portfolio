import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const projects = [
  {
    id: 'stock',
    index: '01',
    title: 'Stock Market Trend Prediction System',
    stack: ['Python', 'TensorFlow', 'scikit-learn', 'yfinance'],
    summary:
      'Time-series forecasting pipeline built to compare baseline, regression, and deep learning approaches against real market movement.',
    impact: 'Benchmarked models with MAE and RMSE to focus on realistic predictive quality.',
    details: [
      'Built a repeatable data pipeline using Pandas and NumPy for historical market preparation.',
      'Tested multiple regression and neural approaches instead of relying on a single model family.',
      'Structured evaluation around error-based metrics that reflect production-style forecasting tradeoffs.',
    ],
    accent: 'coral',
  },
  {
    id: 'fake-news',
    index: '02',
    title: 'Fake News Detection System',
    stack: ['BERT', 'PyTorch', 'Transformers', 'NewsDataAPI'],
    summary:
      'Language intelligence workflow for deceptive content detection using contextual cross-referencing and transformer inference.',
    impact: 'Combined confidence scoring with live context checks for stronger trust signals.',
    details: [
      'Integrated Hugging Face BERT and PyTorch into an automated content classification workflow.',
      'Used NewsDataAPI for real-time linguistic comparison and contextual validation.',
      'Designed a decision layer driven by AI confidence scores to improve content integrity checks.',
    ],
    accent: 'teal',
  },
  {
    id: 'sentiment',
    index: '03',
    title: 'Twitter Sentiment Analysis System',
    stack: ['Python', 'NLP', 'TF-IDF', 'Naive Bayes'],
    summary:
      'Lightweight sentiment pipeline focused on fast preprocessing, interpretable text features, and classical ML evaluation.',
    impact: 'Turned noisy social data into usable sentiment signals with a compact pipeline.',
    details: [
      'Implemented tokenization, stop-word removal, and TF-IDF vectorization for social text.',
      'Trained and evaluated Naive Bayes models for interpretable sentiment prediction.',
      'Optimized the workflow for clarity and reproducibility rather than over-complication.',
    ],
    accent: 'gold',
  },
];

const skillGroups = [
  { label: 'Machine Learning', value: 92, tone: 'teal' },
  { label: 'Natural Language Processing', value: 88, tone: 'coral' },
  { label: 'Deep Learning Workflows', value: 84, tone: 'gold' },
  { label: 'Python + Data Tooling', value: 90, tone: 'teal' },
];

const floatingSkills = [
  'Python',
  'C++',
  'SQL',
  'PyTorch',
  'TensorFlow',
  'scikit-learn',
  'Pandas',
  'NumPy',
  'BERT',
  'Git',
  'GitHub',
  'Watsonx AutoAI',
];

const timeline = [
  {
    year: '2025',
    title: 'Artificial Intelligence Intern',
    place: 'IBM | Remote',
    copy:
      'Designed end-to-end ML pipelines with IBM Watsonx AutoAI, compared manual and automated models, and improved inference stability in Python workflows.',
  },
  {
    year: '2024',
    title: 'Machine Learning Intern',
    place: 'SoftPro | Remote',
    copy:
      'Built preprocessing pipelines, baseline scikit-learn models, and feature engineering workflows with an emphasis on reusability through Git.',
  },
  {
    year: '2024-25',
    title: 'Open-Source Contributor',
    place: 'GirlScript Summer of Code',
    copy:
      'Contributed features, bug fixes, refactors, and documentation improvements across repositories with well-structured pull requests.',
  },
];

const stats = [
  { value: '7.54', label: 'B.Tech CGPA' },
  { value: '2', label: 'Internships' },
  { value: '3', label: 'Featured Projects' },
  { value: '100+', label: 'DSA Problems Solved' },
];

const titleSequence = [
  'AI/ML Engineer',
  'NLP Builder',
  'Data-Driven Problem Solver',
  'Research-Minded Developer',
];

const reveal = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

function useTypewriter(words, speed = 85, pause = 1400) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index];
    const timeout = setTimeout(
      () => {
        if (!deleting && subIndex === current.length) {
          setDeleting(true);
          return;
        }

        if (deleting && subIndex === 0) {
          setDeleting(false);
          setIndex((prev) => (prev + 1) % words.length);
          return;
        }

        setSubIndex((prev) => prev + (deleting ? -1 : 1));
      },
      deleting ? speed / 2 : subIndex === current.length ? pause : speed,
    );

    return () => clearTimeout(timeout);
  }, [deleting, index, pause, speed, subIndex, words]);

  return `${words[index].slice(0, subIndex)}${subIndex === words[index].length ? '' : '|'}`;
}

function HeroScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;
    let cleanup = () => {};
    let cancelled = false;

    import('three').then((THREE) => {
      if (cancelled) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 100);
      camera.position.set(0, 0, 8);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      mount.appendChild(renderer.domElement);

      const group = new THREE.Group();
      scene.add(group);

      const knot = new THREE.Mesh(
        new THREE.TorusKnotGeometry(1.45, 0.42, 180, 24),
        new THREE.MeshPhysicalMaterial({
          color: '#ff8367',
          roughness: 0.18,
          metalness: 0.4,
          transparent: true,
          opacity: 0.9,
          transmission: 0.16,
        }),
      );

      const orb = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.1, 1),
        new THREE.MeshPhysicalMaterial({
          color: '#6ef3d6',
          roughness: 0.25,
          metalness: 0.2,
          wireframe: true,
          transparent: true,
          opacity: 0.55,
        }),
      );
      orb.position.set(-2.4, 1.2, -1.5);

      const pointsGeometry = new THREE.BufferGeometry();
      const pointCount = 200;
      const positions = new Float32Array(pointCount * 3);
      for (let i = 0; i < pointCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 12;
        positions[i + 1] = (Math.random() - 0.5) * 8;
        positions[i + 2] = (Math.random() - 0.5) * 8;
      }
      pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const stars = new THREE.Points(
        pointsGeometry,
        new THREE.PointsMaterial({ color: '#f7eee7', size: 0.04, transparent: true, opacity: 0.75 }),
      );

      group.add(knot);
      group.add(orb);
      group.add(stars);

      const ambient = new THREE.AmbientLight('#ffffff', 1.25);
      const point = new THREE.PointLight('#ff997c', 18, 30);
      point.position.set(3, 4, 6);
      const fill = new THREE.PointLight('#74ffe5', 12, 40);
      fill.position.set(-4, -2, 2);
      scene.add(ambient, point, fill);

      const mouse = { x: 0, y: 0 };
      const onPointerMove = (event) => {
        const bounds = mount.getBoundingClientRect();
        mouse.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
        mouse.y = -(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
      };

      const onResize = () => {
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      };

      mount.addEventListener('pointermove', onPointerMove);
      window.addEventListener('resize', onResize);

      let animationFrame;
      const animate = () => {
        animationFrame = window.requestAnimationFrame(animate);
        knot.rotation.x += 0.004;
        knot.rotation.y += 0.006;
        orb.rotation.x -= 0.003;
        orb.rotation.y -= 0.004;
        stars.rotation.y += 0.0008;

        group.rotation.x += (mouse.y * 0.18 - group.rotation.x) * 0.05;
        group.rotation.y += (mouse.x * 0.28 - group.rotation.y) * 0.05;
        knot.position.y = Math.sin(Date.now() * 0.0014) * 0.18;

        renderer.render(scene, camera);
      };

      animate();

      cleanup = () => {
        window.cancelAnimationFrame(animationFrame);
        mount.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('resize', onResize);
        if (mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement);
        }
        pointsGeometry.dispose();
        knot.geometry.dispose();
        knot.material.dispose();
        orb.geometry.dispose();
        orb.material.dispose();
        renderer.dispose();
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return <div className="hero-canvas" ref={mountRef} aria-hidden="true" />;
}

function MagneticButton({ href, children, className = '' }) {
  const [style, setStyle] = useState({});

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    setStyle({ transform: `translate(${x * 0.18}px, ${y * 0.18}px)` });
  };

  return (
    <a
      href={href}
      className={`magnetic-button ${className}`.trim()}
      onMouseMove={handleMove}
      onMouseLeave={() => setStyle({ transform: 'translate(0px, 0px)' })}
    >
      <span style={style}>{children}</span>
    </a>
  );
}

function SectionTitle({ eyebrow, title, copy }) {
  return (
    <motion.div className="section-heading" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </motion.div>
  );
}

function ProjectCard({ project, active, onToggle }) {
  const [style, setStyle] = useState({});

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
    const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -12;
    setStyle({
      transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`,
    });
  };

  return (
    <motion.article
      layout
      className={`project-card ${project.accent} ${active ? 'active' : ''}`}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      onMouseMove={handleMove}
      onMouseLeave={() => setStyle({ transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg)' })}
      style={style}
      onClick={onToggle}
    >
      <div className="project-head">
        <span className="project-index">{project.index}</span>
        <span className="project-stack">{project.stack.join(' • ')}</span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      <strong>{project.impact}</strong>
      <AnimatePresence initial={false}>
        {active ? (
          <motion.ul
            key="details"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {project.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
      <button className="inline-link" type="button">
        {active ? 'Collapse details' : 'Expand project'}
      </button>
    </motion.article>
  );
}

function App() {
  const typedTitle = useTypewriter(titleSequence);
  const [activeProject, setActiveProject] = useState(projects[0].id);
  const [sent, setSent] = useState(false);
  const formRef = useRef(null);

  const orbitTokens = useMemo(
    () =>
      floatingSkills.map((skill, index) => ({
        skill,
        style: {
          '--angle': `${index * 30}deg`,
          '--radius': `${88 + (index % 3) * 22}px`,
          '--delay': `${index * 0.35}s`,
        },
      })),
    [],
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
    formRef.current?.reset();
    window.setTimeout(() => setSent(false), 3200);
  };

  return (
    <div className="app-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />

      <header className="site-header">
        <a href="#top" className="brand">
          <span className="brand-mark">NS</span>
          <span>Namami Saxena</span>
        </a>
        <nav className="nav">
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <HeroScene />
          <div className="hero-grid">
            <motion.div className="hero-copy" variants={reveal} initial="hidden" animate="visible">
              <span className="eyebrow">Final-year B.Tech CSE (AIML) student</span>
              <h1>
                Building thoughtful AI experiences as a <span>{typedTitle}</span>
              </h1>
              <p>
                I’m Namami Saxena, an aspiring AI/ML engineer blending machine learning, NLP, and clean
                implementation to ship practical, trustworthy systems.
              </p>

              <div className="hero-actions">
                <MagneticButton href="#contact" className="primary-button">
                  Let’s Build Together
                </MagneticButton>
                <a className="ghost-button" href="#projects">
                  Explore Projects
                </a>
              </div>

              <div className="stat-row">
                {stats.map((item) => (
                  <motion.article
                    key={item.label}
                    className="glass-card stat-card"
                    variants={reveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.6 }}
                  >
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </motion.article>
                ))}
              </div>
            </motion.div>

            <motion.div className="hero-side" variants={reveal} initial="hidden" animate="visible">
              <div className="profile-card glass-card">
                <div className="profile-photo-wrap">
                  <img src="/assets/namami-portrait.jpeg" alt="Namami Saxena portrait" className="profile-photo" />
                </div>
                <div className="profile-meta">
                  <span className="eyebrow">Based in Uttar Pradesh, India</span>
                  <h3>Focused on ML pipelines, NLP systems, and applied experimentation.</h3>
                  <p>
                    Open to AI/ML internships, entry-level roles, and collaborative projects where strong
                    modeling meets thoughtful execution.
                  </p>
                </div>
              </div>

              <div className="hero-panels">
                <article className="glass-card info-panel">
                  <span className="mini-tag">Education</span>
                  <h4>Moradabad Institute of Technology</h4>
                  <p>B.Tech in Computer Science & Engineering (AIML), graduating in 2026.</p>
                </article>
                <article className="glass-card info-panel">
                  <span className="mini-tag">Highlights</span>
                  <ul>
                    <li>IBM AI Intern and SoftPro ML Intern</li>
                    <li>GirlScript Summer of Code contributor</li>
                    <li>100+ DSA problems solved on LeetCode</li>
                  </ul>
                </article>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section">
          <SectionTitle
            eyebrow="Snapshot"
            title="A portfolio shaped by experimentation, reproducibility, and real AI workflow building."
            copy="From AutoAI benchmarking to transformer-powered classification, my work focuses on dependable systems rather than flashy prototypes."
          />

          <div className="timeline-grid">
            {timeline.map((item) => (
              <motion.article
                key={item.title}
                className="glass-card timeline-card"
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <span className="timeline-year">{item.year}</span>
                <h3>{item.title}</h3>
                <strong>{item.place}</strong>
                <p>{item.copy}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section" id="projects">
          <SectionTitle
            eyebrow="Projects"
            title="A Bento Grid of machine learning work that opens up as you explore it."
            copy="Each card uses hover tilt, ambient float motion, and click-to-expand details for a more tactile case-study experience."
          />

          <div className="project-grid">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                active={activeProject === project.id}
                onToggle={() => setActiveProject((current) => (current === project.id ? '' : project.id))}
              />
            ))}
          </div>
        </section>

        <section className="section skills-section" id="skills">
          <SectionTitle
            eyebrow="Skills"
            title="A toolkit built around modern ML experimentation, language systems, and reliable delivery."
            copy="Animated bars reflect core strengths, while the floating cloud surfaces the tools I use most often."
          />

          <div className="skills-layout">
            <motion.div
              className="glass-card skill-orbit"
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="orbit-center">
                <span>AI / ML</span>
              </div>
              {orbitTokens.map(({ skill, style }) => (
                <span key={skill} className="orbit-token" style={style}>
                  {skill}
                </span>
              ))}
            </motion.div>

            <div className="skill-bars">
              {skillGroups.map((skill) => (
                <motion.article
                  key={skill.label}
                  className="glass-card skill-bar-card"
                  variants={reveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.35 }}
                >
                  <div className="skill-bar-head">
                    <h3>{skill.label}</h3>
                    <span>{skill.value}%</span>
                  </div>
                  <div className="skill-track">
                    <motion.div
                      className={`skill-fill ${skill.tone}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.value}%` }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </motion.article>
              ))}

              <motion.article
                className="glass-card credential-card"
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
              >
                <span className="mini-tag">Academic Base</span>
                <h3>Education and problem-solving foundations</h3>
                <p>
                  CBSE schooling, a 7.54 CGPA in AIML-focused engineering, and consistent hands-on coding
                  practice through LeetCode and HackerRank C++ certification.
                </p>
              </motion.article>
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <SectionTitle
            eyebrow="Contact"
            title="Ready for AI/ML roles, internships, and thoughtful collaboration."
            copy="This demo form uses a lightweight success animation for interaction polish, and the direct contact options are always visible."
          />

          <div className="contact-layout">
            <motion.article
              className="glass-card contact-card"
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              <h3>Reach me directly</h3>
              <a href="mailto:namamisaxena68@gmail.com">namamisaxena68@gmail.com</a>
              <a href="tel:+916396739850">+91 63967 39850</a>
              <a href="https://linkedin.com/in/namami-saxena-a0a821257" target="_blank" rel="noreferrer">
                linkedin.com/in/namami-saxena-a0a821257
              </a>
              <p>
                Most interested in teams working on NLP, predictive systems, applied deep learning, and
                trustworthy AI experiences.
              </p>
            </motion.article>

            <motion.form
              ref={formRef}
              className="glass-card contact-form"
              onSubmit={handleSubmit}
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <label>
                Name
                <input type="text" name="name" placeholder="Your name" required />
              </label>
              <label>
                Email
                <input type="email" name="email" placeholder="you@example.com" required />
              </label>
              <label>
                Message
                <textarea name="message" rows="5" placeholder="Tell me about your project or opportunity." required />
              </label>
              <button type="submit" className="submit-button">
                Send message
              </button>

              <AnimatePresence>
                {sent ? (
                  <motion.div
                    className="success-banner"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                  >
                    <svg viewBox="0 0 120 120" aria-hidden="true">
                      <motion.circle
                        cx="60"
                        cy="60"
                        r="44"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.4 }}
                      />
                      <motion.path
                        d="M38 61.5 53 76 84 45"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.35, delay: 0.25 }}
                      />
                    </svg>
                    <div>
                      <strong>Message staged successfully</strong>
                      <span>This interaction is front-end only, but the UI is ready for backend wiring.</span>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
