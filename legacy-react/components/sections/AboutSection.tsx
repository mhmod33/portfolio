import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Award, Briefcase, Users } from 'lucide-react';

const stats = [
  { key: 'years', icon: Briefcase },
  { key: 'projects', icon: Award },
  { key: 'clients', icon: Users },
];

export const AboutSection = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-surface/50" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="section-title mb-4">{t('about.title')}</h2>
            <p className="text-muted-foreground text-lg">{t('about.subtitle')}</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Bio */}
            <motion.div variants={itemVariants}>
              <p className="text-lg leading-relaxed text-secondary-foreground mb-8">
                {t('about.bio')}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat) => (
                  <motion.div
                    key={stat.key}
                    className="border-gradient p-6 rounded-2xl text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-3xl font-bold text-gradient mb-1">
                      {t(`about.${stat.key}`)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t(`about.${stat.key}Label`)}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Education Card */}
            <motion.div variants={itemVariants}>
              <div className="border-gradient p-8 rounded-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{t('about.education')}</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg">{t('about.degree')}</h4>
                    <p className="text-primary">{t('about.university')}</p>
                    <p className="text-sm text-muted-foreground">{t('about.graduationYear')}</p>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <Award className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{t('about.achievement')}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
