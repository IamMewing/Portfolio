import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FiDownload, FiMail, FiArrowRight, FiGithub } from 'react-icons/fi';
import { gsap } from 'gsap';

const roles = [
  'Frontend Developer',
  'React Developer',
  'AI Builder',
  'Problem Solver',
  'Creative Thinker',
];

const TypingText = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <span className="gradient-text typing-cursor font-mono">{displayed}</span>
  );
};

const FloatingShape = ({ size, x, y, delay, color }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.8, ease: 'easeOut' }}
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      left: x,
      top: y,
      background: `radial-gradient(circle, ${color}20, transparent 70%)`,
      animation: `float ${5 + delay}s ease-in-out ${delay}s infinite`,
      border: `1px solid ${color}20`,
    }}
  />
);

const Hero = () => {
  const mouseGlowRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const glow = mouseGlowRef.current;
    if (!hero || !glow) return;

    const onMove = (e) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      gsap.to(glow, {
        x: x - 300,
        y: y - 300,
        duration: 0.8,
        ease: 'power2.out',
      });
    };

    hero.addEventListener('mousemove', onMove);
    return () => hero.removeEventListener('mousemove', onMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Mouse-follow glow */}
      <div
        ref={mouseGlowRef}
        className="absolute pointer-events-none w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139,6,245,0.12) 0%, rgba(0,229,255,0.04) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Static background gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,6,245,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      {/* Floating shapes */}
      <FloatingShape size={200} x="8%" y="15%" delay={0.5} color="#8B06F5" />
      <FloatingShape size={120} x="85%" y="20%" delay={1.2} color="#00E5FF" />
      <FloatingShape size={160} x="75%" y="65%" delay={0.8} color="#8B06F5" />
      <FloatingShape size={100} x="5%" y="70%" delay={1.5} color="#00E5FF" />

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {/* Tag */}
            <motion.div variants={itemVariants}>
              <span className="section-tag">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Available for opportunities
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.div variants={itemVariants}>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] text-text-primary">
                Hi, I'm{' '}
                <span className="gradient-text block sm:inline">Dharma Teja</span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div variants={itemVariants} className="space-y-1">
              <p className="text-text-secondary text-lg sm:text-xl font-medium">
                Software Developer &{' '}
                <span className="text-accent font-semibold">Generative AI Enthusiast</span>
              </p>
              <div className="flex items-center gap-2 text-base sm:text-lg">
                <span className="text-text-secondary">Currently:</span>
                <TypingText />
              </div>
            </motion.div>

            {/* Bio */}
            <motion.p variants={itemVariants} className="text-text-secondary leading-relaxed max-w-xl">
              I'm an aspiring software developer passionate about building modern web applications
              and AI-powered solutions. I enjoy solving problems, creating beautiful user experiences,
              and continuously learning emerging technologies.
            </motion.p>

            {/* Location */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 text-text-secondary text-sm">
              <span>📍</span>
              <span>Hyderabad, India</span>
              <span className="w-1 h-1 rounded-full bg-text-secondary" />
              <span className="text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Open to work
              </span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
              <Link to="projects" smooth duration={600} offset={-80}>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(139,6,245,0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary group"
                  id="hero-view-projects"
                >
                  View Projects
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline group"
                id="hero-download-resume"
              >
                <FiDownload className="group-hover:animate-bounce" />
                Download Resume
              </motion.a>

              <Link to="contact" smooth duration={600} offset={-80}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-accent border border-accent/30 hover:border-accent/60 hover:shadow-[0_0_20px_rgba(0,229,255,0.2)] transition-all duration-300"
                  id="hero-contact"
                >
                  <FiMail />
                  Contact Me
                </motion.button>
              </Link>
            </motion.div>

            {/* Social mini row */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 pt-2">
              <a href="https://github.com/dharmateja" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors text-sm">
                <FiGithub size={16} />
                <span>GitHub</span>
              </a>
              <span className="w-px h-4 bg-white/20" />
              <span className="text-text-secondary text-xs">Aspiring Developer | CS Graduate</span>
            </motion.div>
          </motion.div>

          {/* Right: Avatar card */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Orbiting dots */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="absolute w-72 h-72 rounded-full border border-primary/10" />
                <div className="absolute w-96 h-96 rounded-full border border-primary/5" />
                <div className="orbit absolute" style={{ width: 10, height: 10, borderRadius: '50%', background: '#8B06F5', boxShadow: '0 0 10px #8B06F5' }} />
                <div className="orbit-reverse absolute" style={{ width: 7, height: 7, borderRadius: '50%', background: '#00E5FF', boxShadow: '0 0 8px #00E5FF' }} />
              </div>

              {/* Avatar */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10"
              >
                <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-3xl gradient-border overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 via-card to-accent/10 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent mx-auto flex items-center justify-center text-4xl font-display font-black text-white shadow-[0_0_40px_rgba(139,6,245,0.5)]">
                        DT
                      </div>
                      <p className="mt-4 font-display font-semibold text-text-primary">Dharma Teja</p>
                      <p className="text-xs text-text-secondary mt-1">Software Developer</p>
                      <div className="mt-3 flex justify-center gap-1">
                        <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs border border-primary/30">React</span>
                        <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs border border-accent/30">AI</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <motion.div
                  animate={{ x: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute -left-12 top-12 glass rounded-xl border border-white/10 px-3 py-2 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-text-primary font-medium">Open to Work</span>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -right-10 bottom-16 glass rounded-xl border border-white/10 px-3 py-2 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🤖</span>
                    <div>
                      <p className="text-text-primary font-medium text-xs">AI Enthusiast</p>
                      <p className="text-text-secondary text-[10px]">GenAI Builder</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-text-secondary text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center pt-2"
        >
          <div className="w-1.5 h-3 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
