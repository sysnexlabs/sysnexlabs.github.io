import React from 'react'
import { motion } from 'framer-motion'
import SpotlightCard from '../components/SpotlightCard'
import './Page.css'

const Contact = () => {
  return (
    <div className="page">
      <section className="page-hero-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Contact</h1>
            <p className="page-hero-description">
              Interested in collaboration, research partnerships, or pilot projects?
            </p>
          </motion.div>
        </div>
      </section>

      <section className="page-content-section">
        <div className="container">
          <div className="contact-grid">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <SpotlightCard>
                <div className="card-icon" aria-hidden="true">📧</div>
                <h3 className="card-title">Email</h3>
                <p className="card-description">
                  <a href="mailto:sysnex.labs.github@gmail.com">sysnex.labs.github@gmail.com</a>
                </p>
              </SpotlightCard>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
