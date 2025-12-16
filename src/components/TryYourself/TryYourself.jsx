import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import TryYourselfEditor from '../TryYourselfEditor/TryYourselfEditor'
import DocumentationView from '../DocumentationView/DocumentationView'
import './TryYourself.css'

export default function TryYourself() {
  const [editorCode, setEditorCode] = useState(null)

  return (
    <section className="try-yourself-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="try-yourself-header"
        >
          <h2 className="section-title">Try SysML v2 Yourself</h2>
          <p className="section-subtitle">
            Experience SysML v2 directly in your browser. Write code in the editor and see 
            the live documentation view update in real-time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="try-yourself-container"
        >
          <div className="try-yourself-grid">
            <div className="editor-column">
              <TryYourselfEditor onCodeChange={setEditorCode} />
            </div>
            <div className="documentation-column">
              <DocumentationView code={editorCode} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="try-yourself-footer"
        >
          <p className="try-yourself-note">
            <strong>Note:</strong> This is a proof of concept. Full WASM-based parsing and 
            advanced features are coming soon. For production use, check out our{' '}
            <Link to="/try-yourself">VS Code Extension</Link>.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
