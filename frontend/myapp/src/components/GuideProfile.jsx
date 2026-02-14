import { useTranslation } from 'react-i18next'
import styles from '../styles/guide.module.css'

export default function GuideProfile() {
  const { t } = useTranslation()

  return (
    <section className={styles.guidePage}>
      <div className={styles.container}>
        <div className={styles.profileCard}>
          <div className={styles.identity}>
            <div className={styles.avatar}>MG</div>

            <div className={styles.identityText}>
              <h2>{t('guide.roleTitle')}</h2>
              <span>{t('guide.roleSub')}</span>
            </div>
          </div>

          <div className={styles.content}>
            <h1>{t('guide.title')}</h1>
            <p className={styles.subtitle}>{t('guide.subtitle')}</p>

            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>{t('guide.info.one')}</div>
              <div className={styles.infoItem}>{t('guide.info.two')}</div>
              <div className={styles.infoItem}>{t('guide.info.three')}</div>
              <div className={styles.infoItem}>{t('guide.info.four')}</div>
            </div>

            <p className={styles.desc}>{t('guide.desc')}</p>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.primary}
                onClick={() => {
                  document
                    .getElementById('contact')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {t('guide.primaryCta')}
              </button>

              <button
                type="button"
                className={styles.secondary}
                onClick={() => {
                  document
                    .getElementById('services')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {t('guide.secondaryCta')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
