import type { ContactFormData } from '@features/ContactForm/model/schema';

export const openContactEmail = (data: ContactFormData, recipientEmail: string): void => {
  const subject = encodeURIComponent(data.subject);
  const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`);

  window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
}
