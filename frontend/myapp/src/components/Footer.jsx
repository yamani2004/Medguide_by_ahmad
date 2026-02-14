import { useTranslation } from 'react-i18next'
import styles from '../styles/footer.module.css'

export default function Footer() {
  const { t } = useTranslation()

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <h3>MedGuide</h3>
          <p>{t('footer.brandDesc')}</p>

          <div className={styles.trustBadges}>
            <span>{t('footer.badges.hipaa')}</span>
            <span>{t('footer.badges.iso')}</span>
            <span>{t('footer.badges.international')}</span>
          </div>
        </div>

        <div className={styles.links}>
          <div>
            <h4>{t('footer.sections.services')}</h4>
            <button
              type="button"
              className={styles.linkItem}
              onClick={() => scrollTo('services')}
            >
              {t('footer.links.medicalTourism')}
            </button>
            <button
              type="button"
              className={styles.linkItem}
              onClick={() => scrollTo('services')}
            >
              {t('footer.links.hospitalMatching')}
            </button>
            <button
              type="button"
              className={styles.linkItem}
              onClick={() => scrollTo('services')}
            >
              {t('footer.links.visaAssistance')}
            </button>
            <button
              type="button"
              className={styles.linkItem}
              onClick={() => scrollTo('services')}
            >
              {t('footer.links.secondOpinion')}
            </button>
          </div>

          <div>
            <h4>{t('footer.sections.support')}</h4>
            <button
              type="button"
              className={styles.linkItem}
              onClick={() => scrollTo('contact')}
            >
              {t('footer.links.contactUs')}
            </button>
            <button
              type="button"
              className={styles.linkItem}
              onClick={() => scrollTo('guide')}
            >
              {t('footer.links.patientCare')}
            </button>
            <span className={styles.staticItem}>{t('footer.links.faqs')}</span>
            <span className={styles.staticItem}>
              {t('footer.links.privacyPolicy')}
            </span>
          </div>

          <div>
            <h4>{t('footer.sections.regions')}</h4>
            <span className={styles.staticItem}>{t('footer.links.india')}</span>
            <span className={styles.staticItem}>{t('footer.links.turkey')}</span>
            <span className={styles.staticItem}>{t('footer.links.thailand')}</span>
            <span className={styles.staticItem}>{t('footer.links.uae')}</span>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>{t('footer.bottom.rights')}</p>
        <span>{t('footer.bottom.tagline')}</span>
      </div>
    </footer>
  )
}
