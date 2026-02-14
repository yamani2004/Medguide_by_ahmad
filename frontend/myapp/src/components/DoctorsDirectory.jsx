import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { doctorProfiles, specialtyList } from '../data/doctorProfiles'
import styles from '../styles/doctorsDirectory.module.css'

const PROFILE_CONTACT_NUMBER = '+918588081968'
const PROFILE_CONTACT_DISPLAY = '+91 85880 81968'

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
              {t(`subject.${item.key}`, { defaultValue: item.label })}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filteredDoctors.map((doctor) => (
            <article key={doctor.id} className={styles.card}>
              <div className={styles.top}>
                <h3>{doctor.name}</h3>
                <span className={styles.specialty}>
                  {t(`subject.${doctor.specialty}`, {
                    defaultValue: doctor.specialtyLabel || doctor.specialty,
                  })}
                </span>
              </div>
              <p className={styles.title}>{doctor.title}</p>
              <p className={styles.meta}>
                {t('doctors.hospital')}: {doctor.hospital}
              </p>
              {doctor.location && (
                <p className={styles.meta}>
                  {t('doctors.location', { defaultValue: 'Location' })}:{' '}
                  {doctor.location}
                </p>
              )}
              <p className={styles.meta}>
                {t('doctors.experience')}: {doctor.experience}
              </p>
              <p className={styles.meta}>
                {t('doctors.languages')}: {doctor.languages.join(', ')}
              </p>
              <p className={styles.note}>{doctor.note}</p>

              {doctor.qualifications?.length > 0 && (
                <>
                  <p className={styles.metaTitle}>
                    {t('doctors.qualifications', { defaultValue: 'Qualifications' })}
                  </p>
                  <ul className={styles.list}>
                    {doctor.qualifications.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              )}

              {doctor.expertise?.length > 0 && (
                <>
                  <p className={styles.metaTitle}>
                    {t('doctors.expertise', { defaultValue: 'Areas of Expertise' })}
                  </p>
                  <ul className={styles.list}>
                    {doctor.expertise.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              )}

              {doctor.memberships?.length > 0 && (
                <>
                  <p className={styles.metaTitle}>
                    {t('doctors.memberships', { defaultValue: 'Memberships' })}
                  </p>
                  <ul className={styles.list}>
                    {doctor.memberships.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              )}

              <p className={styles.profileContact}>
                {t('doctors.contact', { defaultValue: 'Contact' })}:{' '}
                <a href={`tel:${PROFILE_CONTACT_NUMBER}`}>
                  {PROFILE_CONTACT_DISPLAY}
                </a>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
