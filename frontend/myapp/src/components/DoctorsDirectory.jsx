import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { doctorProfiles, specialtyList } from '../data/doctorProfiles'
import styles from '../styles/doctorsDirectory.module.css'

const PROFILE_CONTACT_NUMBER = '+918588081968'
const PROFILE_CONTACT_DISPLAY = '+91 85880 81968'
const PROFILE_WHATSAPP_NUMBER = '918588081968'

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

              <div className={styles.profileContact}>
                <p className={styles.profileContactLabel}>
                  {t('doctors.contact', { defaultValue: 'Contact' })}
                </p>
                <div className={styles.profileActions}>
                  <a
                    className={styles.contactAction}
                    href={`tel:${PROFILE_CONTACT_NUMBER}`}
                  >
                    {PROFILE_CONTACT_DISPLAY}
                  </a>
                  <a
                    className={`${styles.contactAction} ${styles.whatsappAction}`}
                    href={`https://wa.me/${PROFILE_WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg
                      className={styles.whatsappIcon}
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        d="M16.003 3C8.83 3 3 8.735 3 15.803a12.67 12.67 0 0 0 2.006 6.875L3.69 29l6.49-1.292a13.05 13.05 0 0 0 5.823 1.37C23.175 29.078 29 23.343 29 16.275 29 9.207 23.175 3 16.003 3Zm0 23.9a10.9 10.9 0 0 1-5.56-1.523l-.399-.24-3.852.766.82-3.734-.26-.394a10.5 10.5 0 0 1-1.7-5.672c0-5.837 4.93-10.583 10.99-10.583 6.06 0 10.99 5.178 10.99 11.015S22.101 26.9 16.002 26.9Zm6.136-7.977c-.336-.166-1.987-.97-2.295-1.08-.308-.11-.533-.166-.757.167-.223.332-.867 1.08-1.062 1.302-.195.221-.39.249-.727.083-.336-.166-1.421-.516-2.707-1.646-.998-.878-1.673-1.962-1.869-2.294-.195-.332-.02-.511.147-.676.15-.148.336-.388.504-.582.168-.194.224-.333.336-.554.112-.222.056-.416-.028-.582-.084-.166-.757-1.8-1.037-2.465-.273-.649-.55-.56-.757-.571l-.645-.011c-.224 0-.588.083-.896.416-.308.332-1.174 1.136-1.174 2.77 0 1.634 1.202 3.212 1.37 3.434.168.221 2.367 3.75 5.736 5.254.801.348 1.426.556 1.913.712.804.256 1.536.22 2.115.133.646-.095 1.987-.804 2.267-1.58.28-.776.28-1.44.196-1.58-.084-.138-.308-.221-.644-.388Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
