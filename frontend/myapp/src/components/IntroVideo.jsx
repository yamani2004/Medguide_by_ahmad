import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import styles from '../styles/introVideo.module.css'

const videoSources = {
  en: {
    src: '/videos/intro-en.mp4',
    track: '/videos/intro-en.vtt',
    poster: '/videos/intro-en.jpg',
  },
  ar: {
    src: '/videos/intro-ar.mp4',
    track: '/videos/intro-ar.vtt',
    poster: '/videos/intro-ar.jpg',
  },
  hi: {
    src: '/videos/intro-hi.mp4',
    track: '/videos/intro-hi.vtt',
    poster: '/videos/intro-hi.jpg',
  },
}

export default function IntroVideo() {
  const { i18n, t } = useTranslation()
  const [failedLanguages, setFailedLanguages] = useState({})
  const [soundOn, setSoundOn] = useState(false)

  const language = useMemo(() => {
    const normalized = (i18n.resolvedLanguage || i18n.language || 'en').split('-')[0]
    return ['en', 'ar', 'hi'].includes(normalized) ? normalized : 'en'
  }, [i18n.language, i18n.resolvedLanguage])

  const activeVideo = videoSources[language]
  const videoError = Boolean(failedLanguages[language])

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className={styles.header}
        >
          <span className={styles.badge}>{t('video.badge')}</span>
          <h2>{t('video.title')}</h2>
          <p>{t('video.subtitle')}</p>
        </motion.div>

        {!videoError ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewport={{ once: true }}
            className={styles.videoCard}
          >
            <video
              key={language}
              className={styles.video}
              autoPlay
              muted={!soundOn}
              loop
              preload="metadata"
              playsInline
              poster={activeVideo.poster}
              controlsList="nodownload noplaybackrate noremoteplayback"
              disablePictureInPicture
              onError={() => {
                setFailedLanguages((prev) => ({ ...prev, [language]: true }))
              }}
            >
              <source src={activeVideo.src} type="video/mp4" />
              <track
                kind="subtitles"
                src={activeVideo.track}
                srcLang={language}
                label={t(`common.languages.${language}`)}
                default
              />
              {t('video.unsupported')}
            </video>

            <button
              type="button"
              className={styles.soundToggle}
              onClick={() => setSoundOn((prev) => !prev)}
              aria-label={t('common.aria.toggleVideoSound')}
            >
              {soundOn ? t('video.sound.off') : t('video.sound.on')}
            </button>
          </motion.div>
        ) : (
          <div className={styles.fallbackCard}>
            <h3>{t('video.fallbackTitle')}</h3>
            <p>{t('video.fallbackText')}</p>
            <button type="button" onClick={scrollToServices}>
              {t('video.ctaServices')}
            </button>
          </div>
        )}

        <p className={styles.note}>{t('video.sourceNote')}</p>
      </div>
    </section>
  )
}
