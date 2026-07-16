import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiClock, FiStar } from 'react-icons/fi';
import { projects } from '../../data/projects';

const techColors = {
  HTML: '#E34F26',
  CSS: '#1572B6',
  JavaScript: '#F7DF1E',
  Bootstrap: '#7952B3',
  React: '#61DAFB',
  GSAP: '#8B06F5',
  ScrollTrigger: '#00E5FF',
  Python: '#3776AB',
  'AI APIs': '#412991',
  'Generative AI': '#00E5FF',
};

const ProjectCard = ({ project, index, inView }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative glass rounded-2xl border overflow-hidden transition-all duration-500
        ${project.comingSoon
          ? 'border-dashed border-white/20'
          : hovered
            ? 'border-primary/40 shadow-[0_20px_60px_rgba(139,6,245,0.15)] -translate-y-2'
            : 'border-white/5'
        }`}
    >
      {/* Project image / preview area */}
      <div
        className="relative h-48 overflow-hidden"
        style={{
          background: project.comingSoon
            ? 'linear-gradient(135deg, rgba(0,229,255,0.05), rgba(139,6,245,0.05))'
            : `linear-gradient(135deg, ${project.color}15, rgba(17,17,17,0.8))`,
        }}
      >
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />

        {/* Project icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ y: hovered ? -8 : 0, scale: hovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
            className="text-6xl"
          >
            {project.comingSoon
              ? '🚀'
              : project.id === 1 ? '💰' : project.id === 2 ? '🏠' : '⛳'}
          </motion.div>
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full
                          bg-primary/20 border border-primary/30 text-primary text-xs font-semibold backdrop-blur-sm">
            <FiStar size={10} />
            Featured
          </div>
        )}

        {/* Coming soon badge */}
        {project.comingSoon && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full
                          bg-accent/10 border border-accent/30 text-accent text-xs font-semibold backdrop-blur-sm">
            <FiClock size={10} />
            Coming Soon
          </div>
        )}

        {/* Hover overlay */}
        <AnimatePresence>
          {hovered && !project.comingSoon && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center gap-3"
              style={{ background: 'rgba(9,9,9,0.7)', backdropFilter: 'blur(8px)' }}
            >
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.05 }}
                  className="w-12 h-12 rounded-xl glass border border-white/20 flex items-center justify-center
                             text-text-primary hover:text-primary hover:border-primary/40 transition-colors"
                >
                  <FiGithub size={20} />
                </motion.a>
              )}
              {project.demo && (
                <motion.a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="w-12 h-12 rounded-xl glass border border-white/20 flex items-center justify-center
                             text-text-primary hover:text-accent hover:border-accent/40 transition-colors"
                >
                  <FiExternalLink size={20} />
                </motion.a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card content */}
      <div className="p-6">
        <h3 className="font-display font-bold text-text-primary text-xl mb-2 group-hover:gradient-text transition-all">
          {project.title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-lg text-xs font-medium border"
              style={{
                color: techColors[tech] || '#A0A0A0',
                borderColor: `${techColors[tech] || '#A0A0A0'}30`,
                backgroundColor: `${techColors[tech] || '#A0A0A0'}10`,
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        {!project.comingSoon ? (
          <div className="flex gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                           bg-white/5 border border-white/10 text-text-secondary hover:text-primary
                           hover:border-primary/30 transition-all text-sm font-medium"
              >
                <FiGithub size={15} />
                GitHub
              </a>
            )}
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                           bg-primary/15 border border-primary/30 text-primary
                           hover:bg-primary/25 transition-all text-sm font-medium"
              >
                <FiExternalLink size={15} />
                Live Demo
              </a>
            ) : (
              <span className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                             bg-white/3 border border-white/5 text-text-secondary/50 text-sm cursor-default">
                Demo Soon
              </span>
            )}
          </div>
        ) : (
          <div className="py-3 rounded-xl border border-dashed border-accent/30 text-center">
            <span className="text-accent text-sm font-medium">🔮 In Development</span>
          </div>
        )}
      </div>

      {/* Glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(circle at 50% 0%, ${project.color}08, transparent 60%)`,
        }}
      />
    </motion.div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="section-pad bg-background relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/3 right-0 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,6,245,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="max-w-7xl mx-auto px-6" ref={sectionRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-tag">Portfolio</span>
          <h2 className="section-heading">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-2xl mx-auto leading-relaxed">
            A collection of projects that showcase my skills, creativity, and passion for building great software.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-text-secondary mb-4">More projects coming soon...</p>
          <a
            href="https://github.com/dharmateja"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-outline"
          >
            <FiGithub />
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
