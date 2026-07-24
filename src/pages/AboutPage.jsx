import Navbar from '../components/Navbar'
import AboutNumbersSection from '../components/AboutNumbersSection'
import FAQSection from '../components/FAQSection'
import Footer from '../components/Footer'
import { aboutPageStory } from '../data/about'
import { useSiteNavigation } from '../hooks/useSiteNavigation'

export default function AboutPage() {
  const { navigateTo } = useSiteNavigation()

  const handleReadReviews = () => {
    const faq = document.getElementById('faq')
    if (faq) {
      const top = faq.getBoundingClientRect().top + window.scrollY - 145
      window.scrollTo({ top, behavior: 'smooth' })
      return
    }
    navigateTo('#faq')
  }

  return (
    <>
      <Navbar onNavClick={navigateTo} />
      <main className="about-page">
        <div className="about-page__inner">
          <section className="about-page-intro">
            <div className="about-page-intro__left">
              <h1 className="about-page__title">
                Who
                <br />
                are we?
              </h1>
              <button type="button" className="btn btn-read-reviews" onClick={handleReadReviews}>
                Read reviews
              </button>
            </div>

            <div className="about-page-intro__copy">
              <p className="about-page-intro__subtitle">{aboutPageStory.subtitle}</p>
              {aboutPageStory.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </section>

          <AboutNumbersSection />
        </div>

        <FAQSection onAskQuestion={() => navigateTo('#contacts')} />
      </main>
      <Footer onNavClick={navigateTo} />
    </>
  )
}
