import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink } from 'lucide-react';

const contactInfo = [
  { key: 'email', icon: Mail, value: 'me653830@gmail.com', href: 'mailto:me653830@gmail.com' },
  { key: 'phone', icon: Phone, value: '+20 115 940 3998', href: 'tel:+201159403998' },
  { key: 'location', icon: MapPin, valueKey: 'locationValue' },
];

const socialLinks = [
  { name: 'GitHub', icon: Github, href: 'https://github.com/mhmod33' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/mahmoud-sayed-ali' },
  { name: 'Behance', icon: ExternalLink, href: 'https://behance.net/mahmoudsayb75d00' },
];

export const ContactSection = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-surface/50" />
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div ref={ref} className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <h2 className="section-title mb-4">{t('contact.title')}</h2>
            <p className="text-muted-foreground text-lg">{t('contact.subtitle')}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t(`contact.${item.key}`)}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="font-medium hover:text-primary transition-colors animated-underline"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-medium">
                        {item.valueKey ? t(`contact.${item.valueKey}`) : item.value}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
                className="pt-6"
              >
                <p className="text-sm text-muted-foreground mb-4">{t('contact.social')}</p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl border border-border hover:border-primary hover:text-primary transition-all duration-300"
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.name}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="border-gradient p-8 rounded-2xl flex flex-col items-center justify-center text-center"
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 glow">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t('contact.cta')}</h3>
              <p className="text-muted-foreground mb-6">
                {t('contact.subtitle')}
              </p>
              <motion.a
                href="mailto:me653830@gmail.com"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium hover:glow transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5" />
                me653830@gmail.com
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
