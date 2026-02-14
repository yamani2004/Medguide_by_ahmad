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
                <span className={styles.linkContent}>
                  <svg
                    className={styles.whatsappIcon}
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M16.003 3C8.83 3 3 8.735 3 15.803a12.67 12.67 0 0 0 2.006 6.875L3.69 29l6.49-1.292a13.05 13.05 0 0 0 5.823 1.37C23.175 29.078 29 23.343 29 16.275 29 9.207 23.175 3 16.003 3Zm0 23.9a10.9 10.9 0 0 1-5.56-1.523l-.399-.24-3.852.766.82-3.734-.26-.394a10.5 10.5 0 0 1-1.7-5.672c0-5.837 4.93-10.583 10.99-10.583 6.06 0 10.99 5.178 10.99 11.015S22.101 26.9 16.002 26.9Zm6.136-7.977c-.336-.166-1.987-.97-2.295-1.08-.308-.11-.533-.166-.757.167-.223.332-.867 1.08-1.062 1.302-.195.221-.39.249-.727.083-.336-.166-1.421-.516-2.707-1.646-.998-.878-1.673-1.962-1.869-2.294-.195-.332-.02-.511.147-.676.15-.148.336-.388.504-.582.168-.194.224-.333.336-.554.112-.222.056-.416-.028-.582-.084-.166-.757-1.8-1.037-2.465-.273-.649-.55-.56-.757-.571l-.645-.011c-.224 0-.588.083-.896.416-.308.332-1.174 1.136-1.174 2.77 0 1.634 1.202 3.212 1.37 3.434.168.221 2.367 3.75 5.736 5.254.801.348 1.426.556 1.913.712.804.256 1.536.22 2.115.133.646-.095 1.987-.804 2.267-1.58.28-.776.28-1.44.196-1.58-.084-.138-.308-.221-.644-.388Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>WhatsApp Chat</span>
                </span>
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
