import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiGithub, FiStar, FiGitBranch, FiUsers, FiCode } from 'react-icons/fi';

const repos = [
  {
    name: 'expense-tracker',
    description: 'A responsive expense management application built with vanilla JavaScript.',
    stars: 2,
    forks: 0,
    language: 'JavaScript',
    langColor: '#F7DF1E',
    url: 'https://github.com/IamMewing',
  },
  {
    name: 'pg-life',
    description: 'PG booking website with Bootstrap UI and authentication features.',
    stars: 1,
    forks: 0,
    language: 'HTML',
    langColor: '#E34F26',
    url: 'https://github.com/IamMewing',
  },
  {
    name: 'sidecup-golf-clone',
    description: 'Pixel-perfect GSAP-animated landing page with custom cursor and scroll effects.',
    stars: 3,
    forks: 1,
    language: 'JavaScript',
    langColor: '#F7DF1E',
    url: 'https://github.com/IamMewing',
  },
  {
    name: 'portfolio',
    description: 'Personal developer portfolio built with React, Framer Motion and GSAP.',
    stars: 1,
    forks: 0,
    language: 'JSX',
    langColor: '#61DAFB',
    url: 'https://github.com/IamMewing',
  },
];

const githubStats = [
  { label: 'Repositories', value: '15+', icon: FiCode, color: '#8B06F5' },
  { label: 'Total Stars', value: '12+', icon: FiStar, color: '#00E5FF' },
  { label: 'Contributions', value: '200+', icon: FiGitBranch, color: '#8B06F5' },
  { label: 'Followers', value: '10+', icon: FiUsers, color: '#00E5FF' },
];

// Visual contribution grid (static placeholder matching GitHub's pattern)
const ContributionGrid = () => {
  const days = Array.from({ length: 52 * 7 }, (_, i) => {
    const rand = Math.random();
    if (rand < 0.45) return 0;
    if (rand < 0.65) return 1;
    if (rand < 0.80) return 2;
    if (rand < 0.92) return 3;
    return 4;
  });

  const levelColors = [
    'rgba(255,255,255,0.05)',
    'rgba(139,6,245,0.25)',
    'rgba(139,6,245,0.45)',
    'rgba(139,6,245,0.70)',
    '#8B06F5',
  ];

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-[3px] min-w-[700px]">
        {Array.from({ length: 52 }, (_, week) => (
          <div key={week} className="flex flex-col gap-[3px]">
            {Array.from({ length: 7 }, (_, day) => {
              const level = days[week * 7 + day];
              return (
                <div
                  key={day}
                  className="w-3 h-3 rounded-[2px] transition-all hover:scale-125"
                  style={{
                    backgroundColor: levelColors[level],
                    boxShadow: level >= 3 ? `0 0 6px ${levelColors[level]}` : 'none',
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

const GitHub = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="github" className="section-pad bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,6,245,0.05) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="max-w-7xl mx-auto px-6" ref={sectionRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-tag">Open Source</span>
          <h2 className="section-heading">
            GitHub <span className="gradient-text">Activity</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
            Consistently building, contributing, and learning through code.
          </p>
        </motion.div>

        {/* GitHub profile card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass rounded-2xl border border-white/5 p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-display font-black text-white text-lg">
                DT
              </div>
              <div>
                <h3 className="font-display font-bold text-text-primary text-xl">IamMewing</h3>
                <p className="text-text-secondary text-sm">Software Developer · Hyderabad, India</p>
              </div>
            </div>
            <a
              href="https://github.com/IamMewing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 btn-outline text-sm"
            >
              <FiGithub />
              View Profile
            </a>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {githubStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="bg-white/5 rounded-xl p-4 text-center border border-white/5 hover:border-white/15 transition-all"
              >
                <stat.icon size={18} className="mx-auto mb-2" style={{ color: stat.color }} />
                <div className="font-display font-bold text-xl text-text-primary" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-text-secondary text-xs">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Contribution graph */}
          <div>
            <h4 className="font-display font-semibold text-text-primary mb-4 text-sm">
              Contribution Activity (2024)
            </h4>
            <ContributionGrid />
            <div className="flex items-center gap-2 mt-3 justify-end">
              <span className="text-text-secondary text-xs">Less</span>
              {['rgba(255,255,255,0.05)', 'rgba(139,6,245,0.25)', 'rgba(139,6,245,0.45)', 'rgba(139,6,245,0.70)', '#8B06F5'].map((c, i) => (
                <div key={i} className="w-3 h-3 rounded-[2px]" style={{ backgroundColor: c }} />
              ))}
              <span className="text-text-secondary text-xs">More</span>
            </div>
          </div>
        </motion.div>

        {/* Pinned repos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="font-display font-semibold text-text-primary text-lg mb-4">Pinned Repositories</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {repos.map((repo, i) => (
              <motion.a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.35 + i * 0.08 }}
                whileHover={{ y: -4, borderColor: 'rgba(139,6,245,0.3)' }}
                className="glass rounded-xl border border-white/5 p-5 block group transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2 text-text-primary font-medium group-hover:text-primary transition-colors">
                    <FiGithub size={16} />
                    <span className="text-sm font-mono">{repo.name}</span>
                  </div>
                  <FiStar size={14} className="text-text-secondary group-hover:text-yellow-400 transition-colors" />
                </div>
                <p className="text-text-secondary text-xs leading-relaxed mb-4">{repo.description}</p>
                <div className="flex items-center gap-4 text-xs text-text-secondary">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: repo.langColor }} />
                    <span>{repo.language}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiStar size={11} />
                    <span>{repo.stars}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiGitBranch size={11} />
                    <span>{repo.forks}</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHub;
