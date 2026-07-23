import { useState } from 'react'
import { faqItems } from '../data/faq'

export default function FAQSection({ onAskQuestion }) {
  const [openId, setOpenId] = useState(null)

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id))

  return (
    <section id="faq" className="faq-section section">
      <div className="container">
        <div className="faq-header">
          <h2 className="section-title">FAQ</h2>
          <button type="button" className="btn btn-outline" onClick={onAskQuestion}>
            Ask a Question
          </button>
        </div>

        <div className="faq-list">
          {faqItems.map((item) => (
            <div
              key={item.id}
              className={`faq-item ${openId === item.id ? 'faq-item--open' : ''}`}
            >
              <button
                type="button"
                className="faq-item__question"
                onClick={() => toggle(item.id)}
                aria-expanded={openId === item.id}
              >
                <span>{item.question}</span>
                <span className="faq-item__icon" aria-hidden="true">
                  {openId === item.id ? '−' : '+'}
                </span>
              </button>
              {openId === item.id && (
                <div className="faq-item__answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
