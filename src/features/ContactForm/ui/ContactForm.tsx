import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { HiCheck, HiPaperAirplane } from 'react-icons/hi2';

import { personal } from '@shared/constants';
import { Button } from '@shared/ui/Button';
import { Input } from '@shared/ui/Input';
import { Textarea } from '@shared/ui/Textarea';

import { openContactEmail } from '@features/ContactForm/api/sendContactMessage';
import { type ContactFormData, contactSchema } from '@features/ContactForm/model/schema';

import styles from './ContactForm.module.scss';

export const ContactForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    openContactEmail(data, personal.email);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <div className={styles.formWrapper}>
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            className={styles.success}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className={styles.successIcon}>
              <HiCheck size={32} />
            </div>
            <h3 className={styles.successTitle}>Email client opened</h3>
            <p className={styles.successText}>
              Send the pre-filled message from your mail app. I&apos;ll get back to you within 24
              hours.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            noValidate
          >
            <div className={styles.row}>
              <Input
                label="Name"
                placeholder="John Doe"
                error={errors.name?.message}
                {...register('name')}
              />
              <Input
                label="Email"
                type="email"
                placeholder="john@example.com"
                error={errors.email?.message}
                {...register('email')}
              />
            </div>
            <Input
              label="Subject"
              placeholder="Project inquiry"
              error={errors.subject?.message}
              {...register('subject')}
            />
            <Textarea
              label="Message"
              placeholder="Tell me about your project..."
              error={errors.message?.message}
              {...register('message')}
            />
            <Button
              type="submit"
              variant="primary"
              size="lg"
              rightIcon={<HiPaperAirplane size={18} />}
              className={styles.submit}
            >
              Send Message
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
