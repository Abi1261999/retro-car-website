const stats = [
  { value: '32', label: 'Retro car' },
  { value: '400', label: 'Satisfied clients' },
  { value: '5', label: 'Years' },
]

export default function AboutSection() {
  return (
    <section id="about" className="about-section section">
      <div className="container about-grid">
        <div className="about-text">
          <h2 className="section-title">
            About us
            <br />
            <span className="section-title--muted">in numbers</span>
          </h2>
          <p className="about-description">
            From acquisition to restoration, we specialize in iconic automobiles,
            ensuring each drive is a celebration of timeless style. Elevate your
            journey with our passion for preserving automotive heritage.
          </p>
        </div>
        <div className="about-stats">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <div className="stat-card__value">{stat.value}</div>
              <div className="stat-card__label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
