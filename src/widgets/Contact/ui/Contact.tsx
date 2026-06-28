import { motion } from 'framer-motion';
import { HiArrowDownTray, HiEnvelope } from 'react-icons/hi2';

import { personal, SECTION_IDS, socialLinks } from '@shared/constants';
import { Container } from '@shared/ui/Container';
import { GradientBlob } from '@shared/ui/GradientBlob';
import { SectionHeading } from '@shared/ui/SectionHeading';

import { ContactForm } from '@features/ContactForm';

import styles from './Contact.module.scss';

export const Contact = () => {
  return (
    <section id={SECTION_IDS.contact} className={styles.contact}>
      <GradientBlob color="tertiary" size="lg" className={styles.blob} />

      <Container>
        <div className={styles.grid}>
          <div className={styles.info}>
            <SectionHeading
              label="Contact"
              title="Let's build something extraordinary"
              description="Have a project in mind or want to collaborate? I'd love to hear from you."
            />

            <motion.div
              className={styles.details}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <a href={`mailto:${personal.email}`} className={styles.email}>
                <HiEnvelope size={20} />
                {personal.email}
              </a>

              <div className={styles.socials}>
                {socialLinks.map(({ icon: Icon, url, label }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label={label}
                  >
                    <Icon size={22} />
                  </a>
                ))}
              </div>

              <a href={personal.cvUrl} className={styles.cvButton} download>
                <HiArrowDownTray size={18} />
                Download CV
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
