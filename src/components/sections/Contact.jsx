import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiSend, FiDownload, FiMapPin, FiPhone } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

const contactInfo = [
  {
    icon: FiMail,
    label: 'Email',
    value: 'dharmateja@gmail.com',
    href: 'mailto:dharmateja@gmail.com',
    color: '#8B06F5',
  },
  {
    icon: FiGithub,
    label: 'GitHub',
    value: 'github.com/IamMewing',
    href: 'https://github.com/IamMewing',
    color: '#F5F5F5',
  },
  {
    icon: FiLinkedin,
    label: 'LinkedIn',
    value: 'https://www.linkedin.com/in/dharmatejabairy23/',
    href: 'https://www.linkedin.com/in/dharmatejabairy23/',
    color: '#0077B5',
  },
  {
    icon: FiMapPin,
    label: 'Location',
    value: 'Hyderabad, India',
    href: null,
    color: '#00E5FF',
  },
];

const Contact = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    setSending(true);
    // Simulate sending
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    toast.success('Message sent! I\'ll get back to you soon 🚀', {
      style: { background: '#111', color: '#F5F5F5', border: '1px solid rgba(139,6,245,0.3)' },
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="section-pad bg-background relative overflow-hidden">
      <Toaster position="top-right" />

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139,6,245,0.05) 0%, transparent 60%)' }} />

      <div className="max-w-7xl mx-auto px-6" ref={sectionRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-tag">Get in Touch</span>
          <h2 className="section-heading">
            Let's <span className="gradient-text">Work Together</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or just want to chat? I'm always open to new opportunities,
            collaborations, and interesting conversations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-display font-bold text-text-primary text-2xl mb-2">
              Ready to build something amazing?
            </h3>
            <p className="text-text-secondary leading-relaxed mb-8">
              I'm currently open to new opportunities as a frontend developer or AI enthusiast collaborator.
              Whether it's a full-time role, freelance project, or an exciting side project — let's talk!
            </p>

            {/* Contact info cards */}
            <div className="space-y-4 mb-8">
              {contactInfo.map(({ icon: Icon, label, value, href, color }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-4 glass rounded-xl p-4 border border-white/5
                             hover:border-white/15 transition-all group"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                  >
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-text-secondary text-xs mb-0.5">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="text-text-primary text-sm font-medium truncate block hover:text-primary transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-text-primary text-sm font-medium">{value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Resume download */}
            <motion.a
              href="/resume.pdf"
              download
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(139,6,245,0.3)' }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl
                         bg-gradient-to-r from-primary to-accent text-white font-semibold
                         shadow-[0_0_20px_rgba(139,6,245,0.3)] transition-all duration-300"
              id="contact-resume-download"
            >
              <FiDownload size={20} />
              Download My Resume
            </motion.a>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl border border-white/5 p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-text-secondary text-xs mb-2 font-medium" htmlFor="name">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-text-primary text-sm
                               placeholder:text-text-secondary/50 focus:outline-none focus:border-primary/50
                               focus:shadow-[0_0_15px_rgba(139,6,245,0.1)] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-text-secondary text-xs mb-2 font-medium" htmlFor="email">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-text-primary text-sm
                               placeholder:text-text-secondary/50 focus:outline-none focus:border-primary/50
                               focus:shadow-[0_0_15px_rgba(139,6,245,0.1)] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-text-secondary text-xs mb-2 font-medium" htmlFor="subject">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project inquiry, collaboration, etc."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-text-primary text-sm
                             placeholder:text-text-secondary/50 focus:outline-none focus:border-primary/50
                             focus:shadow-[0_0_15px_rgba(139,6,245,0.1)] transition-all"
                />
              </div>

              <div>
                <label className="block text-text-secondary text-xs mb-2 font-medium" htmlFor="message">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or how I can help..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-text-primary text-sm
                             placeholder:text-text-secondary/50 focus:outline-none focus:border-primary/50
                             focus:shadow-[0_0_15px_rgba(139,6,245,0.1)] transition-all resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={sending}
                whileHover={{ scale: sending ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2
                           disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, #8B06F5, #00E5FF)',
                  boxShadow: '0 0 20px rgba(139,6,245,0.3)',
                }}
                id="contact-submit"
              >
                {sending ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend size={16} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
