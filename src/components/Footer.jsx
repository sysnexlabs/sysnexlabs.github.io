import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import { useTranslation } from '../utils/i18n'
import './Footer.css'

const Footer = () => {
  const { theme } = useTheme()
  const { t } = useTranslation()
  
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="brand">
            <div className="brand-logo">
              <img src={theme === 'light' ? "./assets/logo_new.svg" : "./assets/logo_white.svg"} alt="SysNex" className="logo" />
            </div>
            <span className="brand-text">
              <span className="brand-text-primary">SYSNEX</span>
              <span className="brand-text-secondary">Systems</span>
            </span>
          </div>
          <p className="footer-tagline">
            {t('footer.tagline') || 'NexSuite: Model-Based Systems Engineering with SysML v2'}
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4 className="footer-heading">{t('footer.product.heading')}</h4>
            <Link to="/product" className="footer-link">{t('nav.product.overview')}</Link>
            <Link to="/try-yourself" className="footer-link">{t('nav.try-yourself')}</Link>
            <Link to="/pricing" className="footer-link">{t('nav.pricing')}</Link>
            <Link to="/contact" className="footer-link">{t('nav.contact')}</Link>
          </div>
          <div className="footer-column">
            <h4 className="footer-heading">{t('footer.resources.heading')}</h4>
            <a href="./assets/FEATURES.md" className="footer-link" target="_blank" rel="noopener noreferrer">Features</a>
            <a href="https://github.com/sysnex-labs" className="footer-link" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={`mailto:${t('contact.email.address')}`} className="footer-link">{t('contact.email.label')}</a>
          </div>
          <div className="footer-column">
            <h4 className="footer-heading">{t('footer.enterprise.heading')}</h4>
            <Link to="/contact" className="footer-link">{t('footer.enterprise.sales')}</Link>
            <Link to="/contact" className="footer-link">{t('footer.enterprise.compliance')}</Link>
            <Link to="/contact" className="footer-link">{t('footer.enterprise.partnerships')}</Link>
          </div>
          <div className="footer-column">
            <h4 className="footer-heading">{t('footer.legal.heading')}</h4>
            <a href="/legal/privacy" className="footer-link">{t('footer.legal.privacy')}</a>
            <a href="/legal/terms" className="footer-link">{t('footer.legal.terms')}</a>
            <a href="/legal/license" className="footer-link">{t('footer.legal.license')}</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          © {new Date().getFullYear()} SysNex. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer

