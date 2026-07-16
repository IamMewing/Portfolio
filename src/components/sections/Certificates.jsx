import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiExternalLink, FiAward } from 'react-icons/fi';
import { certificates } from '../../data/experience';

const CertCard = ({ cert, index, inView }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative h-52 cursor-pointer"
      style={{ perspective: 1000 }}
      onClick={() => setFlipped(!flipped)}
      data-cursor
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%' }}
      >
        {/* Front face */}
        <div
          className="absolute inset-0 glass rounded-2xl border border-white/10 p-5
                     hover:border-white/20 transition-all duration-300 overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Background glow */}
          <div
            className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none opacity-20"
            style={{ background: `radial-gradient(circle, ${cert.color}, transparent)`, filter: 'blur(20px)' }}
          />

          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-start justify-between">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: `${cert.color}20`, border: `1px solid ${cert.color}40` }}
              >
                {cert.icon}
              </div>
              <div className="flex items-center gap-1 text-xs text-text-secondary">
                <FiAward size={11} />
                <span>{cert.date}</span>
              </div>
            </div>

            <div>
              <h3 className="font-display font-bold text-text-primary text-base leading-snug mb-1">
                {cert.name}
              </h3>
              <p className="text-text-secondary text-xs">{cert.platform}</p>
            </div>

            <div className="flex items-center justify-between">
              <span
                className="px-2.5 py-1 rounded-full text-xs font-medium border"
                style={{ color: cert.color, borderColor: `${cert.color}40`, backgroundColor: `${cert.color}10` }}
              >
                {cert.issuer}
              </span>
              <span className="text-text-secondary text-[10px]">Click to flip →</span>
            </div>
          </div>
        </div>

        {/* Back face */}
        <div
          className="absolute inset-0 glass rounded-2xl border border-white/10 p-5 flex flex-col
                     items-center justify-center text-center"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="text-4xl mb-3">{cert.icon}</div>
          <h3 className="font-display font-bold text-text-primary text-sm mb-2">{cert.name}</h3>
          <p className="text-text-secondary text-xs mb-4">{cert.issuer} · {cert.date}</p>
          {cert.placeholder ? (
            <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-text-secondary text-xs">
              Certificate Pending
            </span>
          ) : (
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/20
                               border border-primary/30 text-primary text-xs hover:bg-primary/30 transition-colors">
              <FiExternalLink size={12} />
              View Certificate
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Certificates = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="certificates" className="section-pad bg-background relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="max-w-7xl mx-auto px-6" ref={sectionRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-tag">Achievements</span>
          <h2 className="section-heading">
            Certificates & <span className="gradient-text">Recognition</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
            Continuous learning and validation of skills through recognized platforms and competitions.
            <span className="text-primary font-medium"> Click any card</span> to flip it!
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certificates.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} inView={inView} />
          ))}
        </div>

        {/* Achievement banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12 glass rounded-2xl border border-primary/20 p-6 text-center
                     shadow-[0_0_30px_rgba(139,6,245,0.08)]"
        >
          <div className="text-3xl mb-3">🏆</div>
          <h3 className="font-display font-bold text-text-primary text-xl mb-2">
            Always Learning
          </h3>
          <p className="text-text-secondary max-w-lg mx-auto text-sm leading-relaxed">
            Every certificate represents a milestone in my continuous learning journey.
            I believe in validating knowledge through practice and recognized certifications.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;
