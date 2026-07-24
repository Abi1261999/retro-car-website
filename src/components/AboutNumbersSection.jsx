import { aboutCarImage, aboutStats } from '../data/about'

export default function AboutNumbersSection() {
  return (
    <div className="about-visual">
      <div className="about-stats" aria-label="Company statistics">
        {aboutStats.map((stat) => (
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
  )
}
