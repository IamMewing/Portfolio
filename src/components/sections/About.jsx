import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';

const stats = [
  { value: 4, label: 'Projects Completed', suffix: '+', color: '#8B06F5' },
  { value: 10, label: 'Technologies Learned', suffix: '+', color: '#00E5FF' },
  { value: 15, label: 'GitHub Repositories', suffix: '+', color: '#8B06F5' },
  { value: 3, label: 'AI Projects', suffix: '+', color: '#00E5FF' },
  { value: 5, label: 'Bootcamps Attended', suffix: '+', color: '#8B06F5' },
];

const timeline = [
  {
    year: '2023',
    title: 'Computer Science Graduate',
    description: 'Completed my Computer Science degree with a focus on software development, algorithms, and modern web technologies.',
    icon: '🎓',
  },
  {
    year: '2023',
    title: 'Discovered Frontend Development',
    description: 'Fell in love with building beautiful, interactive user interfaces using HTML, CSS, JavaScript, and React.',
    icon: '💻',
  },
  {
    year: '2024',
    title: 'Generative AI Exploration',
    description: 'Dived deep into the world of Generative AI, learning prompt engineering, AI APIs, and building AI-powered applications.',
    icon: '🤖',
  },
  {
    year: '2024',
    title: 'SuperTeacher Internship',
    description: 'Joined SuperTeacher as a Software Development Intern, gaining real-world experience in product development and agile workflows.',
    icon: '🚀',
  },
  {
    year: '2025+',
    title: 'Building the Future',
    description: 'Continuously learning, building projects, and working toward becoming a full-stack AI developer.',
    icon: '⚡',
    current: true,
  },
];

const StatCard = ({ stat, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card-glow text-center group"
    >
      <div
        className="font-display text-4xl sm:text-5xl font-black mb-2"
        style={{ color: stat.color, textShadow: `0 0 30px ${stat.color}50` }}
      >
        {inView ? <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} /> : '0+'}
      </div>
      <p className="text-text-secondary text-sm leading-snug">{stat.label}</p>
    </motion.div>
  );
};

const About = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-pad bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,6,245,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="max-w-7xl mx-auto px-6" ref={sectionRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-tag">About Me</span>
          <h2 className="section-heading">
            My <span className="gradient-text">Story</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-2xl mx-auto leading-relaxed">
            A passionate developer on a mission to build meaningful digital experiences
            that combine beautiful design with intelligent technology.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Bio + Timeline */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass rounded-2xl p-8 border border-white/5 mb-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-display font-black text-white shadow-[0_0_30px_rgba(139,6,245,0.4)]">
                  DT
                </div>
                <div>
                  <h3 className="font-display font-bold text-text-primary text-xl">Dharma Teja</h3>
                  <p className="text-text-secondary text-sm">Software Developer · Hyderabad, IN</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-xs">Available for opportunities</span>
                  </div>
                </div>
              </div>
              <p className="text-text-secondary leading-relaxed">
                "I'm an aspiring software developer passionate about building modern web applications
                and AI-powered solutions. I enjoy solving problems, creating beautiful user experiences,
                and continuously learning emerging technologies."
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { label: 'Location', value: 'Hyderabad, India' },
                  { label: 'Education', value: 'CS Graduate' },
                  { label: 'Speciality', value: 'Frontend + AI' },
                  { label: 'Status', value: 'Interning @ SuperTeacher' },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white/5 rounded-xl p-3">
                    <p className="text-text-secondary text-xs mb-0.5">{label}</p>
                    <p className="text-text-primary text-sm font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/30 to-transparent" />
              <div className="space-y-6 pl-16">
                {timeline.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                    className="relative"
                  >
                    {/* Dot */}
                    <div className={`absolute -left-[46px] w-8 h-8 rounded-xl flex items-center justify-center text-base
                      ${item.current ? 'bg-primary shadow-[0_0_20px_rgba(139,6,245,0.6)]' : 'glass border border-white/10'}`}>
                      {item.icon}
                    </div>
                    <div className="glass rounded-xl p-4 border border-white/5 hover:border-primary/20 transition-all duration-300">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-primary font-mono font-semibold">{item.year}</span>
                        {item.current && (
                          <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] border border-primary/30 font-semibold">
                            Current
                          </span>
                        )}
                      </div>
                      <h4 className="font-display font-semibold text-text-primary mb-1">{item.title}</h4>
                      <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Stats */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-display font-bold text-2xl text-text-primary mb-8"
            >
              By the <span className="gradient-text">Numbers</span>
            </motion.h3>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.map((stat, i) => (
                <StatCard key={i} stat={stat} index={i} />
              ))}
            </div>

            {/* Passion cards */}
            <div className="space-y-4 mt-8">
              {[
                { icon: '🎨', title: 'UI/UX Enthusiast', desc: 'Crafting pixel-perfect, accessible interfaces' },
                { icon: '🤖', title: 'AI Explorer', desc: 'Building the next wave of intelligent applications' },
                { icon: '📚', title: 'Lifelong Learner', desc: 'Always expanding skills through courses and projects' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className="flex items-start gap-4 glass rounded-xl p-4 border border-white/5 hover:border-primary/20 transition-all group"
                >
                  <div className="text-2xl">{item.icon}</div>
                  <div>
                    <p className="font-display font-semibold text-text-primary text-sm">{item.title}</p>
                    <p className="text-text-secondary text-xs mt-0.5">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
