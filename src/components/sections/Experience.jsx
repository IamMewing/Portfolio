import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi';
import { experiences } from '../../data/experience';

const Experience = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="section-pad bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="max-w-7xl mx-auto px-6" ref={sectionRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-tag">Experience</span>
          <h2 className="section-heading">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
            Hands-on experience building real products and collaborating with teams in a professional environment.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/30 to-transparent hidden md:block" />

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative md:pl-24"
                >
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-0 top-6 w-16 h-16 rounded-2xl items-center justify-center
                                  bg-primary/20 border border-primary/40 shadow-[0_0_20px_rgba(139,6,245,0.3)]">
                    <FiBriefcase size={24} className="text-primary" />
                  </div>

                  {/* Card */}
                  <div className={`glass rounded-2xl border overflow-hidden transition-all duration-300
                    ${exp.current ? 'border-primary/30 shadow-[0_0_30px_rgba(139,6,245,0.08)]' : 'border-white/5'}`}
                  >
                    {/* Card header */}
                    <div className="p-6 pb-4 border-b border-white/5">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-display font-bold text-text-primary text-xl">{exp.role}</h3>
                            {exp.current && (
                              <span className="px-2.5 py-0.5 rounded-full bg-green-400/10 border border-green-400/30 text-green-400 text-xs font-semibold">
                                Current
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="gradient-text font-semibold text-lg">{exp.company}</span>
                            <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs">
                              {exp.type}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-1.5 text-text-secondary text-sm">
                            <FiCalendar size={13} />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-text-secondary text-sm">
                            <FiMapPin size={13} />
                            <span>Hyderabad, India</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-6">
                      <p className="text-text-secondary leading-relaxed mb-5">{exp.description}</p>

                      {/* Responsibilities */}
                      <div className="mb-6">
                        <h4 className="text-text-primary font-semibold text-sm mb-3">Key Responsibilities</h4>
                        <ul className="space-y-2">
                          {exp.responsibilities.map((item, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={inView ? { opacity: 1, x: 0 } : {}}
                              transition={{ delay: 0.4 + i * 0.08 }}
                              className="flex items-start gap-3 text-text-secondary text-sm"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Skills used */}
                      <div>
                        <h4 className="text-text-primary font-semibold text-sm mb-3">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Future placeholder */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative md:pl-24"
              >
                <div className="hidden md:flex absolute left-0 top-6 w-16 h-16 rounded-2xl items-center justify-center
                                bg-white/5 border border-dashed border-white/20">
                  <span className="text-2xl">✨</span>
                </div>
                <div className="glass rounded-2xl border border-dashed border-white/10 p-6 text-center">
                  <p className="text-text-secondary text-sm">
                    More exciting opportunities ahead...
                  </p>
                  <p className="gradient-text font-semibold mt-1">
                    Open to full-time & freelance roles
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
