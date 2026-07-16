import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillCategories } from '../../data/skills';

const SkillBar = ({ skill, inView, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.4, delay }}
    className="group"
  >
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <skill.icon size={16} style={{ color: skill.color }} />
        <span className="text-text-primary text-sm font-medium">{skill.name}</span>
      </div>
      <span className="text-text-secondary text-xs font-mono">{skill.level}%</span>
    </div>
    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
        transition={{ duration: 1, delay: delay + 0.2, ease: 'easeOut' }}
        className="h-full rounded-full"
        style={{
          background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
          boxShadow: `0 0 8px ${skill.color}60`,
        }}
      />
    </div>
  </motion.div>
);

const CategoryCard = ({ category, index, activeCategory, setActiveCategory, inView }) => {
  const isActive = activeCategory === category.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => setActiveCategory(isActive ? null : category.id)}
      data-cursor
      className={`relative glass rounded-2xl p-6 border transition-all duration-500 cursor-pointer
        ${isActive
          ? 'border-primary/40 shadow-[0_0_30px_rgba(139,6,245,0.15)]'
          : 'border-white/5 hover:border-white/15'
        }`}
    >
      {/* Category label */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: category.color, boxShadow: `0 0 10px ${category.color}80` }}
          />
          <h3 className="font-display font-bold text-text-primary text-lg">{category.label}</h3>
        </div>
        <span className="text-text-secondary text-xs font-mono glass px-2 py-1 rounded-lg border border-white/10">
          {category.skills.length} skills
        </span>
      </div>

      {/* Skills icons row */}
      <div className="flex flex-wrap gap-2 mb-4">
        {category.skills.map((skill) => (
          <div
            key={skill.name}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8
                       hover:border-white/20 transition-all group/skill"
          >
            <skill.icon size={14} style={{ color: skill.color }} />
            <span className="text-xs text-text-secondary group-hover/skill:text-text-primary transition-colors">
              {skill.name}
            </span>
          </div>
        ))}
      </div>

      {/* Progress bars - visible when expanded */}
      <motion.div
        initial={false}
        animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="space-y-3 pt-4 border-t border-white/5">
          {category.skills.map((skill, i) => (
            <SkillBar
              key={skill.name}
              skill={skill}
              inView={isActive}
              delay={i * 0.08}
            />
          ))}
        </div>
      </motion.div>

      {/* Expand hint */}
      {!isActive && (
        <p className="text-text-secondary text-xs mt-2">Click to see proficiency levels →</p>
      )}

      {/* Glow decoration */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none opacity-10 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, ${category.color}, transparent)`,
          filter: 'blur(20px)',
        }}
      />
    </motion.div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <section id="skills" className="section-pad bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="max-w-7xl mx-auto px-6" ref={sectionRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-tag">Skills & Technologies</span>
          <h2 className="section-heading">
            My <span className="gradient-text">Toolkit</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-2xl mx-auto leading-relaxed">
            A curated set of tools and technologies I use to build modern, performant digital experiences.
            <span className="text-primary font-medium"> Click any card</span> to see proficiency levels.
          </p>
        </motion.div>

        {/* Skill categories grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((category, i) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={i}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              inView={inView}
            />
          ))}
        </div>

        {/* Learning section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 glass rounded-2xl p-6 border border-white/5"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🌱</span>
            <div>
              <h3 className="font-display font-semibold text-text-primary">Currently Learning</h3>
              <p className="text-text-secondary text-sm">Always expanding the toolkit</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Advanced React', 'Next.js', 'Node.js', 'TypeScript', 'LangChain', 'Tailwind CSS', 'PostgreSQL', 'Docker'].map((tech) => (
              <motion.span
                key={tech}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
