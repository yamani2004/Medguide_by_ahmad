import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { baseReviewTestimonials } from '../data/reviewTestimonials'
import styles from '../styles/patientReviews.module.css'

const ADMIN_KEY = 'medguide-admin'
const STORAGE_KEY = 'medguide_custom_reviews'
const PATIENT_IMAGE_LINKS = [
  {
    link: 'https://www.instagram.com/reel/C1vgeF4JWBI/?igsh=MTRkMm01MWZ2NmJtZg==',
    imageUrl: '/patient-images/patient-1.jpg',
  },
  {
    link: 'https://www.instagram.com/reel/C1vgV4gJ0oT/?igsh=MTA0OW1scmhvbzg5YQ==',
    imageUrl: '/patient-images/patient-2.jpg',
  },
  {
    link: 'https://www.instagram.com/p/DFkUijySvce/?igsh=MTJ2OXcwazM1cWtyZA==',
    imageUrl: '/patient-images/patient-3.jpg',
  },
]

const createReviewFromForm = (form) => ({
  id: `custom-${Date.now()}`,
  patientName: form.patientName.trim(),
  country: form.country.trim(),
  specialty: form.specialty.trim(),
  text: form.text.trim(),
  videoUrl: form.videoUrl.trim(),
})

const loadCustomReviews = () => {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const getInstagramEmbedUrl = (url) => {
  if (!url) return null
  try {
    const parsed = new URL(url)
    if (!parsed.hostname.includes('instagram.com')) return null
    const match = parsed.pathname.match(/\/(reel|p)\/([^/]+)/i)
    if (!match) return null
    return `https://www.instagram.com/${match[1]}/${match[2]}/embed`
  } catch {
    return null
  }
}

const isMp4Url = (url) => /\.mp4($|\?)/i.test(url || '')

export default function PatientReviews() {
  const { t } = useTranslation()
  const [customReviews, setCustomReviews] = useState(() => loadCustomReviews())
  const [adminMode, setAdminMode] = useState(false)
  const [adminInput, setAdminInput] = useState('')
  const [activeAudioId, setActiveAudioId] = useState(null)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    patientName: '',
    country: '',
    specialty: '',
    text: '',
    videoUrl: '',
  })

  const reviews = useMemo(
    () => [...customReviews, ...baseReviewTestimonials],
    [customReviews]
  )
  const patientImageCards = useMemo(
    () =>
      PATIENT_IMAGE_LINKS.map((item, index) => ({
        id: `img-${index + 1}`,
        link: item.link,
        imageUrl: item.imageUrl,
      })),
    []
  )

  const persistReviews = (nextReviews) => {
    setCustomReviews(nextReviews)
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextReviews))
    }
  }

  const enableAdmin = () => {
    if (adminInput === ADMIN_KEY) {
      setAdminMode(true)
      setError('')
      return
    }
    setError(t('reviews.admin.error'))
  }

  const submitReview = (e) => {
    e.preventDefault()
    if (
      !form.patientName.trim() ||
      !form.country.trim() ||
      !form.specialty.trim() ||
      !form.text.trim() ||
      !form.videoUrl.trim()
    ) {
      setError(t('reviews.admin.required'))
      return
    }

    const review = createReviewFromForm(form)
    persistReviews([review, ...customReviews])
    setForm({
      patientName: '',
      country: '',
      specialty: '',
      text: '',
      videoUrl: '',
    })
    setError('')
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.badge}>{t('reviews.badge')}</span>
          <h2>{t('reviews.title')}</h2>
          <p>{t('reviews.subtitle')}</p>
        </header>

        <section className={styles.imageGallery}>
          <h3>
            {t('reviews.imageGalleryTitle', {
              defaultValue: 'Patient Moments & Review Snapshots',
            })}
          </h3>
          <p>
            {t('reviews.imageGallerySubtitle', {
              defaultValue:
                'Real images shared by patients from their medical tourism journey.',
            })}
          </p>
          <div className={styles.imageGrid}>
            {patientImageCards.map((item) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className={styles.imageCard}
              >
                <img src={item.imageUrl} alt={t('reviews.title')} loading="lazy" />
              </a>
            ))}
          </div>
        </section>

        <div className={styles.grid}>
          {reviews.map((review) => {
            const instagramEmbedUrl = getInstagramEmbedUrl(review.videoUrl)
            const isMp4 = isMp4Url(review.videoUrl)

            return (
              <article key={review.id} className={styles.card}>
                <div className={styles.videoWrap}>
                  {instagramEmbedUrl ? (
                    <>
                      <iframe
                        className={styles.embedFrame}
                        src={instagramEmbedUrl}
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        allowFullScreen
                        title={review.patientName}
                      ></iframe>
                      <a
                        className={styles.instagramLink}
                        href={review.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open on Instagram
                      </a>
                    </>
                  ) : (
                    <>
                      <video
                        className={styles.video}
                        src={review.videoUrl}
                        autoPlay={isMp4}
                        muted={activeAudioId !== review.id}
                        loop={isMp4}
                        controls={!isMp4}
                        playsInline
                        preload="metadata"
                      />
                      <button
                        type="button"
                        className={styles.soundToggle}
                        onClick={() =>
                          setActiveAudioId((prev) =>
                            prev === review.id ? null : review.id
                          )
                        }
                        aria-label={t('common.aria.toggleVideoSound')}
                      >
                        {activeAudioId === review.id
                          ? t('reviews.sound.off')
                          : t('reviews.sound.on')}
                      </button>
                    </>
                  )}
                </div>
              <div className={styles.content}>
                <h3>{review.patientName}</h3>
                <p className={styles.meta}>
                  {review.country} | {review.specialty}
                </p>
                <p className={styles.text}>{review.text}</p>
              </div>
              </article>
            )
          })}
        </div>

        <div className={styles.adminPanel}>
          {!adminMode ? (
            <div className={styles.adminLogin}>
              <h3>{t('reviews.admin.title')}</h3>
              <p>{t('reviews.admin.hint')}</p>
              <div className={styles.adminRow}>
                <input
                  value={adminInput}
                  onChange={(e) => setAdminInput(e.target.value)}
                  placeholder={t('reviews.admin.key')}
                />
                <button type="button" onClick={enableAdmin}>
                  {t('reviews.admin.unlock')}
                </button>
              </div>
              {error && <p className={styles.error}>{error}</p>}
            </div>
          ) : (
            <form className={styles.adminForm} onSubmit={submitReview}>
              <h3>{t('reviews.admin.formTitle')}</h3>
              <div className={styles.formGrid}>
                <input
                  value={form.patientName}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, patientName: e.target.value }))
                  }
                  placeholder={t('reviews.admin.patient')}
                />
                <input
                  value={form.country}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, country: e.target.value }))
                  }
                  placeholder={t('reviews.admin.country')}
                />
                <input
                  value={form.specialty}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, specialty: e.target.value }))
                  }
                  placeholder={t('reviews.admin.specialty')}
                />
                <input
                  value={form.videoUrl}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, videoUrl: e.target.value }))
                  }
                  placeholder={t('reviews.admin.video')}
                />
                <textarea
                  value={form.text}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, text: e.target.value }))
                  }
                  placeholder={t('reviews.admin.text')}
                />
              </div>
              <div className={styles.adminActions}>
                <button type="submit">{t('reviews.admin.add')}</button>
                <button
                  type="button"
                  onClick={() => persistReviews([])}
                  className={styles.clear}
                >
                  {t('reviews.admin.clear')}
                </button>
              </div>
              {error && <p className={styles.error}>{error}</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
