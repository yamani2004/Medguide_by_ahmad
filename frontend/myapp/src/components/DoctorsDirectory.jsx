import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { doctorProfiles, specialtyList } from '../data/doctorProfiles'
import styles from '../styles/doctorsDirectory.module.css'

export default function DoctorsDirectory({ selectedSpecialty = 'general' }) {
  const { t } = useTranslation()
  const [manualSpecialty, setManualSpecialty] = useState('all')

  const safeActiveSpecialty = useMemo(() => {
    const navbarSpecialty =
      selectedSpecialty === 'general' ? 'all' : selectedSpecialty
    const effectiveSpecialty =
      manualSpecialty === 'all' ? navbarSpecialty : manualSpecialty

    if (effectiveSpecialty === 'all') return 'all'
    return specialtyList.some((item) => item.key === effectiveSpecialty)
      ? effectiveSpecialty
      : 'all'
  }, [manualSpecialty, selectedSpecialty])

  const filteredDoctors = useMemo(() => {
    if (safeActiveSpecialty === 'all') return doctorProfiles
    return doctorProfiles.filter(
      (doctor) => doctor.specialty === safeActiveSpecialty
    )
  }, [safeActiveSpecialty])

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>{t('doctors.badge')}</span>
          <h2>{t('doctors.title')}</h2>
          <p>{t('doctors.subtitle')}</p>
        </div>

        <div className={styles.filters}>
          {specialtyList.map((item) => (
            <button
              key={item.key}
              type="button"
              className={
                safeActiveSpecialty === item.key
                  ? styles.filterActive
                  : styles.filterButton
              }
              onClick={() => setManualSpecialty(item.key)}
            >
              {t(`subject.${item.key}`)}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filteredDoctors.map((doctor) => (
            <article key={doctor.id} className={styles.card}>
              <div className={styles.top}>
                <h3>{doctor.name}</h3>
                <span className={styles.specialty}>
                  {t(`subject.${doctor.specialty}`)}
                </span>
              </div>
              <p className={styles.title}>{doctor.title}</p>
              <p className={styles.meta}>
                {t('doctors.hospital')}: {doctor.hospital}
              </p>
              <p className={styles.meta}>
                {t('doctors.experience')}: {doctor.experience}
              </p>
              <p className={styles.meta}>
                {t('doctors.languages')}: {doctor.languages.join(', ')}
              </p>
              <p className={styles.note}>{doctor.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
