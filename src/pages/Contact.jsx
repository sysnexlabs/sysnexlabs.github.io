import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SpotlightCard from '../components/SpotlightCard'
import { useTranslation } from '../utils/i18n'
import './Page.css'
import './Contact.css'

const Contact = () => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    interest: 'general',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = t('contact.form.error.name') || 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = t('contact.form.error.email.required') || 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.form.error.email.invalid') || 'Please enter a valid email address'
    }
    if (!formData.message.trim()) newErrors.message = t('contact.form.error.message') || 'Message is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    // In production, this would send to a backend API
    // For now, we'll use mailto as fallback
    const subject = encodeURIComponent(`Contact Form: ${formData.interest}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Company: ${formData.company || 'N/A'}\n` +
      `Role: ${formData.role || 'N/A'}\n` +
      `Interest: ${formData.interest}\n\n` +
      `Message:\n${formData.message}`
    )
    
    window.location.href = `mailto:sysnex.labs.github@gmail.com?subject=${subject}&body=${body}`
    setSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: '',
        email: '',
        company: '',
        role: '',
        interest: 'general',
        message: ''
      })
    }, 3000)
  }

  return (
    <div className="page">
      <section className="page-hero-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>{t('contact.heading')}</h1>
            <p className="page-hero-description">
              {t('contact.intro')}
            </p>
            <div className="contact-hero-cta">
              <Link to="/try-yourself" className="btn primary large">Try Yourself First</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="page-content-section">
        <div className="container">
          <div className="contact-layout">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="contact-form-wrapper"
            >
              <SpotlightCard>
                <h2 className="form-title">{t('contact.form.title')}</h2>
                {submitted ? (
                  <div className="form-success">
                    <div className="success-icon">✓</div>
                    <p>{t('contact.form.success')}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name">{t('contact.form.name')} *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={errors.name ? 'error' : ''}
                          required
                        />
                        {errors.name && <span className="error-message">{errors.name}</span>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">{t('contact.form.email')} *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={errors.email ? 'error' : ''}
                          required
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="company">{t('contact.form.company')}</label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="role">{t('contact.form.role')}</label>
                        <input
                          type="text"
                          id="role"
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          placeholder={t('contact.form.role.placeholder') || 'e.g., Systems Engineer, CTO'}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="interest">{t('contact.form.interest')}</label>
                      <select
                        id="interest"
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                      >
                        <option value="general">{t('contact.form.interest.general')}</option>
                        <option value="demo">{t('contact.form.interest.demo')}</option>
                        <option value="enterprise">{t('contact.form.interest.enterprise')}</option>
                        <option value="partnership">{t('contact.form.interest.partnership')}</option>
                        <option value="support">{t('contact.form.interest.support')}</option>
                        <option value="compliance">{t('contact.form.interest.compliance')}</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">{t('contact.form.message')} *</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className={errors.message ? 'error' : ''}
                        required
                      />
                      {errors.message && <span className="error-message">{errors.message}</span>}
                    </div>
                    <button type="submit" className="btn primary large form-submit">
                      {t('contact.form.submit')}
                    </button>
                  </form>
                )}
              </SpotlightCard>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="contact-info-wrapper"
            >
              <div className="contact-info">
                <SpotlightCard>
                  <div className="card-icon" aria-hidden="true">📧</div>
                  <h3 className="card-title">{t('contact.email.label')}</h3>
                  <p className="card-description">
                    <a href={`mailto:${t('contact.email.address')}`}>{t('contact.email.address')}</a>
                  </p>
                </SpotlightCard>

                <SpotlightCard>
                  <div className="card-icon" aria-hidden="true">💼</div>
                  <h3 className="card-title">{t('contact.enterprise.title')}</h3>
                  <p className="card-description">
                    {t('contact.enterprise.body')}
                  </p>
                </SpotlightCard>

                <SpotlightCard>
                  <div className="card-icon" aria-hidden="true">🤝</div>
                  <h3 className="card-title">{t('contact.partnership.title')}</h3>
                  <p className="card-description">
                    {t('contact.partnership.body')}
                  </p>
                </SpotlightCard>

                <SpotlightCard>
                  <div className="card-icon" aria-hidden="true">⚡</div>
                  <h3 className="card-title">{t('contact.response.title')}</h3>
                  <p className="card-description">
                    {t('contact.response.body')}
                  </p>
                </SpotlightCard>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
