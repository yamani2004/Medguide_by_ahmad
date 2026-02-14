import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import styles from '../styles/services.module.css'

const serviceItems = [
  {
    icon: '\uD83C\uDFE5',
    key: 'matching',
  },
  {
    icon: '\uD83D\uDDE3',
    key: 'language',
  },
  {
    icon: '\uD83E\uDD1D',
    key: 'coordination',
  },
  {
    icon: '\uD83E\uDDEC',
    key: 'planning',
  },
  {
    icon: '\u2708\uFE0F',
    key: 'travel',
  },
  {
    icon: '\uD83D\uDCC4',
    key: 'opinion',
  },
]

export default function Services() {
  const { t } = useTranslation()

  return (
    <section className={styles.services}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
          className={styles.header}
        >
          <span className={styles.badge}>{t('services.badge')}</span>
          <h2>{t('services.title')}</h2>
          <p>{t('services.subtitle')}</p>
        </motion.div>

        <div className={styles.grid}>
          {serviceItems.map((service, index) => (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
                ease: 'easeOut',
              }}
              viewport={{ once: true }}
              className={styles.card}
            >
              <div className={styles.iconWrap}>
                <span className={styles.icon}>{service.icon}</span>
              </div>
              <h3>{t(`services.cards.${service.key}.title`)}</h3>
              <p>{t(`services.cards.${service.key}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
