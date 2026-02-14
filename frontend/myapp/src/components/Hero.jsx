import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import styles from '../styles/hero.module.css'

const carouselSlides = [
  {
    src: 'https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&w=1400&q=80',
    captionKey: 'hero.carousel.one',
  },
  {
    src: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=1400&q=80',
    captionKey: 'hero.carousel.two',
  },
  {
    src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80',
    captionKey: 'hero.carousel.three',
  },
]

export default function Hero() {
  const { t } = useTranslation()
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % carouselSlides.length)
    }, 3200)

    return () => clearInterval(timer)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className={styles.heroPage}>
      <div className={styles.overlay}></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={styles.container}
      >
        <div className={styles.content}>
          <span className={styles.badge}>{t('hero.badge')}</span>

          <h1>{t('hero.title')}</h1>

          <p>{t('hero.sub')}</p>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.primary}
              onClick={() => scrollTo('contact')}
            >
              {t('hero.primaryCta')}
            </button>

            <button
              type="button"
              className={styles.secondary}
              onClick={() => scrollTo('services')}
            >
              {t('hero.secondaryCta')}
            </button>
          </div>

          <div className={styles.stats}>
            <div>
              <strong>50+</strong>
              <span>{t('hero.stats.hospitals')}</span>
            </div>
            <div>
              <strong>10+</strong>
              <span>{t('hero.stats.countries')}</span>
            </div>
            <div>
              <strong>5k+</strong>
              <span>{t('hero.stats.patients')}</span>
            </div>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.carousel}>
            {carouselSlides.map((slide, index) => (
              <img
                key={slide.src}
                src={slide.src}
                alt={t(slide.captionKey)}
                className={
                  index === activeIndex ? styles.carouselImageActive : styles.carouselImage
                }
              />
            ))}

            <div className={styles.carouselCaption}>
              {t(carouselSlides[activeIndex].captionKey)}
            </div>
            <div className={styles.dots}>
              {carouselSlides.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  className={index === activeIndex ? styles.dotActive : styles.dot}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
