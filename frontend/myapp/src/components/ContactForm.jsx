import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from '../styles/contact.module.css'

const CONTACT_NUMBER = '+918588081968'
const CONTACT_NUMBER_DISPLAY = '+91 85880 81968'
const WHATSAPP_NUMBER = '918588081968'

export default function ContactForm({ selectedSpecialty = 'general' }) {
  const { t } = useTranslation()

  const [data, setData] = useState({
    name: '',
    phone: '',
    country: '',
    specialty: selectedSpecialty,
    problem: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      specialty: selectedSpecialty || 'general',
    }))
  }, [selectedSpecialty])

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const validate = () => {
    if (!data.name || !data.phone || !data.country || !data.problem) {
      return t('contact.errors.required')
    }
    if (data.phone.length < 7) {
      return t('contact.errors.phone')
    }
    return null
  }

  const submit = async () => {
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    try {
      setLoading(true)
      setError('')
      setSuccess('')

      await new Promise((res) => setTimeout(res, 1200))

      setSuccess(t('contact.success'))
      setData({
        name: '',
        phone: '',
        country: '',
        specialty: selectedSpecialty || 'general',
        problem: '',
      })
    } catch {
      setError(t('contact.errors.generic'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className={styles.appPage}>
      <div className={styles.container}>
        <div className={styles.brandSection}>
          <h1>{t('contact.brandTitle')}</h1>
          <p>{t('contact.brandSub')}</p>

          <div className={styles.features}>
            <span>{t('contact.features.one')}</span>
            <span>{t('contact.features.two')}</span>
            <span>{t('contact.features.three')}</span>
            <span>{t('contact.features.four')}</span>
          </div>
        </div>

        <div className={styles.formSection}>
          <div className={styles.formCard}>
            <h2>{t('contact.formTitle')}</h2>
            <p className={styles.subtitle}>{t('contact.formSubtitle')}</p>
            <div className={styles.directContact}>
              <p className={styles.directContactTitle}>Direct Assistance</p>
              <a className={styles.contactLink} href={`tel:${CONTACT_NUMBER}`}>
                Call: {CONTACT_NUMBER_DISPLAY}
              </a>
              <a
                className={`${styles.contactLink} ${styles.whatsappLink}`}
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp Chat
              </a>
            </div>

            {error && <div className={styles.error}>{error}</div>}
            {success && <div className={styles.success}>{success}</div>}

            <input
              name="name"
              value={data.name}
              placeholder={t('contact.placeholders.name')}
              onChange={handleChange}
            />

            <input
              name="phone"
              value={data.phone}
              placeholder={t('contact.placeholders.phone')}
              onChange={handleChange}
            />

            <input
              name="country"
              value={data.country}
              placeholder={t('contact.placeholders.country')}
              onChange={handleChange}
            />

            <input
              name="specialty"
              value={t(`subject.${data.specialty}`)}
              placeholder={t('contact.placeholders.specialty')}
              readOnly
            />

            <textarea
              name="problem"
              value={data.problem}
              placeholder={t('contact.placeholders.problem')}
              onChange={handleChange}
            />

            <button type="button" onClick={submit} disabled={loading}>
              {loading ? t('contact.actions.submitting') : t('contact.actions.submit')}
            </button>

            <p className={styles.privacy}>{t('contact.privacy')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
