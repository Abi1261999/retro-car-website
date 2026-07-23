import { aboutCarImage } from '../data/about'

const stats = [
  { id: 'left', value: '32', label: 'Retro car' },
  { id: 'center', value: '400', label: 'Satisfied clients' },
  { id: 'right', value: '5', suffix: 'Years', label: 'Delighting our clients' },
]

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

        <div className="about-visual">
          <div className="about-stats" aria-label="Company statistics">
            {stats.map((stat) => (
              <div key={stat.id} className={`stat-circle stat-circle--${stat.id}`}>
                {stat.suffix ? (
                  <div className="stat-circle__value-row">
                    <span className="stat-circle__value">{stat.value}</span>
                    <span className="stat-circle__suffix">{stat.suffix}</span>
                  </div>
                ) : (
                  <span className="stat-circle__value">{stat.value}</span>
                )}
                <span className="stat-circle__label">{stat.label}</span>
              </div>
            ))}
          </div>

          <img
            src={aboutCarImage}
            alt=""
            className="about-car"
            loading="lazy"
            decoding="async"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  )
}
