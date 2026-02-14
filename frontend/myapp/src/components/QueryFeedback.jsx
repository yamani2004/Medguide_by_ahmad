import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from '../styles/queryFeedback.module.css'

const STORAGE_KEY = 'medguide_query_feedback'

export default function QueryFeedback() {
  const { t } = useTranslation()
  const [form, setForm] = useState({
    name: '',
    answered: '',
    message: '',
  })
  const [status, setStatus] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.answered || !form.message.trim()) {
      setStatus(t('queryFeedback.required'))
      return
    }

    const record = {
      ...form,
      submittedAt: new Date().toISOString(),
    }

    if (typeof window !== 'undefined') {
      const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      localStorage.setItem(STORAGE_KEY, JSON.stringify([record, ...current]))
    }

    setStatus(t('queryFeedback.success'))
    setForm({
      name: '',
      answered: '',
      message: '',
    })
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>{t('queryFeedback.badge')}</span>
          <h2>{t('queryFeedback.title')}</h2>
          <p>{t('queryFeedback.subtitle')}</p>
        </div>

        <form className={styles.form} onSubmit={submit}>
          <input
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            placeholder={t('queryFeedback.name')}
          />

          <div className={styles.radioRow}>
            <label>
              <input
                type="radio"
                name="answered"
                checked={form.answered === 'yes'}
                onChange={() => setForm((prev) => ({ ...prev, answered: 'yes' }))}
              />
              {t('queryFeedback.yes')}
            </label>
            <label>
              <input
                type="radio"
                name="answered"
                checked={form.answered === 'no'}
                onChange={() => setForm((prev) => ({ ...prev, answered: 'no' }))}
              />
              {t('queryFeedback.no')}
            </label>
          </div>

          <textarea
            value={form.message}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, message: e.target.value }))
            }
            placeholder={t('queryFeedback.message')}
          />

          <button type="submit">{t('queryFeedback.submit')}</button>

          {status && <p className={styles.status}>{status}</p>}
        </form>
      </div>
    </section>
  )
}
