import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import styles from '../styles/languageModal.module.css'

export default function LanguageModal({ setOpen }) {
  const { i18n, t } = useTranslation()

  const changeLang = (lang) => {
    i18n.changeLanguage(lang)
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    setOpen(false)
  }

  return (
    <div className={styles.overlay}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className={styles.modal}
      >
        <div className={styles.header}>
          <h2>{t('languageModal.title')}</h2>
          <p>{t('languageModal.subtitle')}</p>
        </div>

        <div className={styles.langList}>
          <button type="button" onClick={() => changeLang('en')}>
            <div>
              <strong>{t('common.languages.en')}</strong>
              <small>{t('languageModal.descriptions.en')}</small>
            </div>
          </button>

          <button type="button" onClick={() => changeLang('ar')}>
            <div>
              <strong>{t('common.languages.ar')}</strong>
              <small>{t('languageModal.descriptions.ar')}</small>
            </div>
          </button>

          <button type="button" onClick={() => changeLang('hi')}>
            <div>
              <strong>{t('common.languages.hi')}</strong>
              <small>{t('languageModal.descriptions.hi')}</small>
            </div>
          </button>
        </div>

        <button type="button" className={styles.close} onClick={() => setOpen(false)}>
          {t('languageModal.cancel')}
        </button>
      </motion.div>
    </div>
  )
}
