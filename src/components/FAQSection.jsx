import { useState } from 'react'
import { faqItems } from '../data/faq'
import { ArrowUpRight } from './ArrowUpRight'

export default function FAQSection({ onAskQuestion }) {
  const [openId, setOpenId] = useState(5)

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id))

  return (
    <section id="faq" className="faq-section">
      <div className="faq-section__inner">
        <aside className="faq-aside">
          <h2 className="faq-title">FAQ</h2>
          <button type="button" className="btn btn-pill btn-faq-cta" onClick={onAskQuestion}>
            Ask a Question
            <ArrowUpRight />
          </button>
        </aside>

        <div className="faq-list">
          {faqItems.map((item) => {
            const isOpen = openId === item.id

            return (
              <div
                key={item.id}
                className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}
              >
                <button
                  type="button"
                  className="faq-item__question"
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-item__text">{item.question}</span>
                  <span className="faq-item__icon" aria-hidden="true" />
                </button>
                <div className="faq-item__answer" hidden={!isOpen}>
                  <p>{item.answer}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
