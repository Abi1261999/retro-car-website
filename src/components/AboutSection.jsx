import AboutNumbersSection from './AboutNumbersSection'

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="about-section__inner">
        <div className="about-header">
          <h2 className="about-title">
            About us
            <br />
            <span className="about-title__muted">in numbers</span>
          </h2>
          <p className="about-description">
            From acquisition to restoration, we specialize in iconic automobiles,
            ensuring each drive is a celebration of timeless style. Elevate your
            journey with our passion for preserving automotive heritage.
          </p>
        </div>

        <AboutNumbersSection />
      </div>
    </section>
  )
}
