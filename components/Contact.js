import { useState } from 'react';
import useInView from '@/hooks/useInView';
import styles from '@/styles/Contact.module.css';

const empty = { name: '', email: '', message: '' };

export default function Contact({ t }) {
  const [ref, visible] = useInView();
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState('idle');

  const onChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!form.name || !form.email) return;
    setStatus('sending');
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus('done');
      setForm(empty);
    } catch (error) {
      setStatus('idle');
    }
  };

  return (
    <section className={`${styles.section} ${visible ? styles.in : ''}`} id="contact" ref={ref}>
      <img className={styles.bg} src="/images/contact-bg-2.png" alt="" />
      <div className={styles.glass}>
        <div className={styles.copy}>
          <h2>
            {t.joinTitle[0]}
            <br />
            {t.joinTitle[1]}
          </h2>
          <p>
            {t.joinBody[0]}
            <br />
            {t.joinBody[1]}
          </p>
        </div>
        <form className={styles.form} onSubmit={onSubmit}>
          <label>
            <span>{t.fields.name}</span>
            <input name="name" value={form.name} onChange={onChange} required data-interactive />
          </label>
          <label>
            <span>{t.fields.email}</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              required
              data-interactive
            />
          </label>
          <label className={styles.message}>
            <span>{t.fields.message}</span>
            <textarea name="message" value={form.message} onChange={onChange} rows={3} data-interactive />
          </label>
          <button type="submit" disabled={status === 'sending'} data-interactive>
            {status === 'sending' ? t.fields.sending : t.fields.submit}
          </button>
          {status === 'done' ? <p className={styles.done}>{t.fields.done}</p> : null}
        </form>
      </div>
    </section>
  );
}
