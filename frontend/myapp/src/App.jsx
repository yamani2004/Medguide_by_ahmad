import { useState } from 'react'
import './styles/global.css'

import LanguageModal from './components/LanguageModal'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import IntroVideo from './components/IntroVideo'
import PatientReviews from './components/PatientReviews'
import Services from './components/Services'
import DoctorsDirectory from './components/DoctorsDirectory'
import GuideProfile from './components/GuideProfile'
import ContactForm from './components/ContactForm'
import QueryFeedback from './components/QueryFeedback'
import Footer from './components/Footer'

export default function App() {
  const [open, setOpen] = useState(() => {
    if (typeof window === 'undefined') return true
    return !localStorage.getItem('preferredLanguage')
  })
  const [selectedSpecialty, setSelectedSpecialty] = useState('general')

  return (
    <>
      {open && <LanguageModal setOpen={setOpen} />}

      <Navbar
        selectedSpecialty={selectedSpecialty}
        onSpecialtyChange={setSelectedSpecialty}
      />

      <main>
        <section id="home">
          <Hero />
        </section>

        <section id="intro-video">
          <IntroVideo />
        </section>

        <section id="services">
          <Services />
        </section>

        <section id="reviews">
          <PatientReviews />
        </section>

        <section id="doctors">
          <DoctorsDirectory selectedSpecialty={selectedSpecialty} />
        </section>

        <section id="guide">
          <GuideProfile />
        </section>

        <section id="feedback">
          <QueryFeedback />
        </section>

        <section id="contact">
          <ContactForm selectedSpecialty={selectedSpecialty} />
        </section>
      </main>

      <Footer />
    </>
  )
}
