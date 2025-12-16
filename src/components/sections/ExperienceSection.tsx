import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { MapPin, Calendar, Building2 } from 'lucide-react';

const experiences = ['iti', 'imdova', 'gx', 'freelance'];

export const ExperienceSection = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-surface/50" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div ref={ref} className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <h2 className="section-title mb-4">{t('experience.title')}</h2>
            <p className="text-muted-foreground text-lg">{t('experience.subtitle')}</p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary to-transparent" />

            {experiences.map((exp, index) => (
              <motion.div
                key={exp}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.15 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background transform -translate-x-1/2 z-10 glow" />

                {/* Content Card */}
                <div
                  className={`w-full md:w-1/2 ${
                    index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                  } pl-8 md:pl-0`}
                >
                  <motion.div
                    className="border-gradient p-6 rounded-2xl hover:glow transition-shadow duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className="text-xl font-bold mb-2">
                      {t(`experience.positions.${exp}.title`)}
                    </h3>

                    <div className="flex items-center gap-2 text-primary mb-2 flex-wrap justify-start md:justify-end">
                      <Building2 className="w-4 h-4" />
                      <span className="font-medium">
                        {t(`experience.positions.${exp}.company`)}
                      </span>
                    </div>

                    <div className={`flex items-center gap-4 text-sm text-muted-foreground mb-4 flex-wrap ${
                      index % 2 === 0 ? 'md:justify-end' : 'justify-start'
                    }`}>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {t(`experience.positions.${exp}.location`)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {t(`experience.positions.${exp}.date`)}
                      </span>
                    </div>

                    <p className="text-secondary-foreground text-sm leading-relaxed">
                      {t(`experience.positions.${exp}.description`)}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
