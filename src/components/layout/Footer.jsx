import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi';

const socials = [
  { icon: FiGithub, href: 'https://github.com/dharmateja', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://linkedin.com/in/dharmateja', label: 'LinkedIn' },
  { icon: FiMail, href: 'mailto:dharmateja@example.com', label: 'Email' },
];

const Footer = () => (
  <footer className="relative border-t border-white/5 bg-background">
    {/* Glow accent */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-primary/40 to-transparent" />

    <div className="max-w-7xl mx-auto px-6 py-14">
      <div className="flex flex-col items-center gap-8">
        {/* Logo */}
        <Link to="hero" smooth duration={800} className="cursor-pointer">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center">
              <span className="gradient-text font-display font-bold">DT</span>
            </div>
            <span className="font-display font-bold text-lg text-text-primary">
              Dharma<span className="gradient-text">Teja</span>
            </span>
          </motion.div>
        </Link>

        <p className="text-text-secondary text-sm text-center max-w-md leading-relaxed">
          Aspiring Software Developer & Generative AI Enthusiast from{' '}
          <span className="text-text-primary">Hyderabad, India</span>. Building beautiful digital experiences.
        </p>

        {/* Socials */}
        <div className="flex items-center gap-4">
          {socials.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center
                         text-text-secondary hover:text-primary hover:border-primary/40 transition-colors duration-200"
              aria-label={label}
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
          <p className="text-text-secondary text-xs">
            © {new Date().getFullYear()} Dharma Teja. All rights reserved.
          </p>
          <p className="text-text-secondary text-xs">
            Built with <span className="text-primary">React</span> &{' '}
            <span className="text-accent">Framer Motion</span> ✨
          </p>
        </div>
      </div>
    </div>

    {/* Back to Top */}
    <Link to="hero" smooth duration={800} className="fixed bottom-8 right-8 z-50 cursor-pointer">
      <motion.button
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 rounded-full glass border border-primary/40 flex items-center justify-center
                   text-primary hover:glow-primary transition-all duration-300 shadow-lg"
        aria-label="Back to top"
      >
        <FiArrowUp size={20} />
      </motion.button>
    </Link>
  </footer>
);

export default Footer;
