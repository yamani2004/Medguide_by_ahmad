import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import styles from '../styles/navbar.module.css'

const SPECIALTY_OPTIONS = [
  'general',
  'cardiology',
  'dentistry',
  'oncology',
  'orthopedic',
  'neurology',
]

const PRIMARY_SECTIONS = ['home', 'services', 'reviews', 'doctors', 'guide', 'feedback', 'contact']

export default function Navbar({ selectedSpecialty, onSpecialtyChange }) {
  const [open, setOpen] = useState(false)
  const { i18n, t } = useTranslation()

  const changeLang = (lang) => {
    i18n.changeLanguage(lang)
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  const handleSpecialtyChange = (specialty, shouldScroll = false) => {
    onSpecialtyChange?.(specialty)
    if (shouldScroll) {
      scrollTo('contact')
    }
  }

  const currentLanguage = ['en', 'ar', 'hi'].includes(i18n.language)
    ? i18n.language
    : (i18n.resolvedLanguage || 'en').split('-')[0]

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <button
          type="button"
          className={styles.logo}
          onClick={() => scrollTo('home')}
        >
          MedGuide
        </button>

        <div className={styles.desktopLinks}>
          <div className={styles.linkGroup}>
            {PRIMARY_SECTIONS.map((sectionKey) => (
              <button
                key={sectionKey}
                type="button"
                onClick={() => scrollTo(sectionKey)}
              >
                {t(`nav.${sectionKey}`)}
              </button>
            ))}
          </div>

          <span className={styles.divider} aria-hidden="true"></span>

          <div className={styles.utilityGroup}>
            <button
              type="button"
              className={styles.cta}
              onClick={() => scrollTo('contact')}
            >
              {t('nav.consult')}
            </button>

            <select
              className={styles.langSelect}
              onChange={(e) => changeLang(e.target.value)}
              value={currentLanguage}
              aria-label={t('common.aria.selectLanguage')}
            >
              <option value="en">{t('common.languages.en')}</option>
              <option value="ar">{t('common.languages.ar')}</option>
              <option value="hi">{t('common.languages.hi')}</option>
            </select>

            <select
              className={styles.subjectSelect}
              value={selectedSpecialty}
              onChange={(e) => handleSpecialtyChange(e.target.value)}
              aria-label={t('subject.title')}
            >
              {SPECIALTY_OPTIONS.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {t(`subject.${specialty}`)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="button"
          className={styles.menu}
          onClick={() => setOpen((prev) => !prev)}
          aria-label={t('common.aria.toggleMenu')}
          aria-expanded={open}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            className={styles.mobileMenu}
          >
            {PRIMARY_SECTIONS.map((sectionKey) => (
              <button
                key={sectionKey}
                type="button"
                onClick={() => scrollTo(sectionKey)}
              >
                {t(`nav.${sectionKey}`)}
              </button>
            ))}

            <div className={styles.mobileLang}>
              <button type="button" onClick={() => changeLang('en')}>
                {t('common.languages.en')}
              </button>
              <button type="button" onClick={() => changeLang('ar')}>
                {t('common.languages.ar')}
              </button>
              <button type="button" onClick={() => changeLang('hi')}>
                {t('common.languages.hi')}
              </button>
            </div>

            <div className={styles.mobileSubjects}>
              <span>{t('subject.title')}</span>
              {SPECIALTY_OPTIONS.map((specialty) => (
                <button
                  type="button"
                  key={specialty}
                  className={
                    selectedSpecialty === specialty ? styles.subjectActive : ''
                  }
                  onClick={() => handleSpecialtyChange(specialty, true)}
                >
                  {t(`subject.${specialty}`)}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
