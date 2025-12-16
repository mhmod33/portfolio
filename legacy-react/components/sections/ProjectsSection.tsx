import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Building, Coffee, ShoppingCart, Smartphone } from 'lucide-react';

const projects = [
  { key: 'realEstate', icon: Building, color: 'from-cyan-500 to-blue-500' },
  { key: 'cafeteria', icon: Coffee, color: 'from-orange-500 to-red-500' },
  { key: 'ecommerce', icon: ShoppingCart, color: 'from-green-500 to-emerald-500' },
  { key: 'moqayada', icon: Smartphone, color: 'from-pink-500 to-purple-500' },
];

export const ProjectsSection = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div ref={ref} className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <h2 className="section-title mb-4">{t('projects.title')}</h2>
            <p className="text-muted-foreground text-lg">{t('projects.subtitle')}</p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.key}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="project-card group"
              >
                {/* Project Header with Gradient */}
                <div className={`relative h-48 bg-gradient-to-br ${project.color} p-6 flex items-end`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-6 right-6 p-3 rounded-xl bg-black/20 backdrop-blur-sm">
                    <project.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="relative text-2xl font-bold text-white">
                    {t(`projects.items.${project.key}.title`)}
                  </h3>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <p className="text-secondary-foreground mb-4 line-clamp-2">
                    {t(`projects.items.${project.key}.description`)}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {(t(`projects.items.${project.key}.tech`, { returnObjects: true }) as string[]).map(
                      (tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                        >
                          {tech}
                        </span>
                      )
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {t('projects.viewProject')}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:border-primary text-sm font-medium transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      {t('projects.viewCode')}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
