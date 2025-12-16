import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TryYourselfEditor, { DEFAULT_EXAMPLE } from '../components/TryYourselfEditor/TryYourselfEditor'
import DocumentationTabs from '../components/DocumentationTabs/DocumentationTabs'
import UvlSection from '../components/UvlSection/UvlSection'
import { useTranslation } from '../utils/i18n'
import './Page.css'
import './TryYourself.css'

export default function TryYourself() {
  const [editorCode, setEditorCode] = useState(DEFAULT_EXAMPLE)
  const { t } = useTranslation()

  return (
    <div className="page">
      <section className="page-hero-section">
        <div className="container">
          <h1>{t('try-yourself.title')}</h1>
          <p className="page-hero-description">
            {t('try-yourself.description')}
          </p>
        </div>
      </section>

      <section className="page-content-section">
        <div className="container">
          <div className="try-yourself-page-grid">
            <div className="editor-column">
              <TryYourselfEditor onCodeChange={setEditorCode} />
            </div>
            <div className="documentation-column">
              <DocumentationTabs code={editorCode} />
            </div>
          </div>

          <div className="try-yourself-footer">
            <p className="try-yourself-note">
              <strong>{t('try-yourself.note').split(':')[0]}:</strong> {t('try-yourself.note').split(':')[1]?.trim()}{' '}
              <Link to="/contact">{t('try-yourself.note.link')}</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* UVL Section */}
      <UvlSection />
    </div>
  )
}
