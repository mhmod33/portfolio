import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { Server, Layout, Palette, Wrench } from 'lucide-react';

const skillCategories = [
  {
    key: 'backend',
    icon: Server,
    skills: ['PHP', 'Laravel', 'MySQL', 'Node.js', 'Express.js', 'RESTful APIs', 'MVC Architecture'],
  },
  {
    key: 'frontend',
    icon: Layout,
    skills: ['Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap', 'Tailwind CSS', 'jQuery'],
  },
  {
    key: 'design',
    icon: Palette,
    skills: ['UI Design', 'UX Design', 'Wireframing', 'Prototyping', 'Style Guides', 'Figma', 'Responsive Design'],
  },
  {
    key: 'tools',
    icon: Wrench,
    skills: ['Git & GitHub', 'Docker', 'Postman', 'Linux', 'Xampp', 'PHPMyAdmin', 'WordPress'],
  },
];

export const SkillsSection = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-center mb-16"
          >
            <h2 className="section-title mb-4">{t('skills.title')}</h2>
            <p className="text-muted-foreground text-lg">{t('skills.subtitle')}</p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + categoryIndex * 0.1 }}
                className="border-gradient p-6 rounded-2xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-primary/10">
                    <category.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">
                    {t(`skills.categories.${category.key}`)}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.3 + categoryIndex * 0.1 + skillIndex * 0.05 }}
                      className="skill-badge"
                      whileHover={{ scale: 1.05 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
