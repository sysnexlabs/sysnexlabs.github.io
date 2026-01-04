import React, { useState, useMemo } from 'react'
import { useSysMLDocumentation } from '../../hooks/useSysMLWasm'
import { useSysMLAnalytics } from '../../hooks/useSysMLAnalytics'
import SpotlightCard from '../SpotlightCard'
import './TestingView.css'

/**
 * Testing View Component
 *
 * Extracts and displays test cases, verification cases, and assertions from SysML v2 code using WASM
 */
export default function TestingView({ code }) {
  const { documentation, loading: docLoading } = useSysMLDocumentation(code, 'editor://current')
  const { analytics, loading: analyticsLoading } = useSysMLAnalytics(code, 'editor://current')
  const [activeTab, setActiveTab] = useState('verifications')

  // Extract verifications with objective blocks
  const verifications = useMemo(() => {
    if (!documentation || !documentation.chapters) return []

    const verifList = []
    documentation.chapters.forEach(chapter => {
      if (chapter.subchapters) {
        chapter.subchapters.forEach(sub => {
          if (sub.kind && (sub.kind.includes('Verification') || sub.kind.includes('verification'))) {
            // Extract objective blocks
            const objectives = []
            if (sub.nested_elements) {
              sub.nested_elements.forEach(nested => {
                // Check for objective blocks
                if (nested.title === 'objective' || nested.kind?.toLowerCase().includes('objective')) {
                  // Extract verify statements from objective
                  if (nested.nested_elements) {
                    nested.nested_elements.forEach(verifyStmt => {
                      if (verifyStmt.signature?.includes('verify') || verifyStmt.title?.includes('verify')) {
                        objectives.push({
                          type: 'verify',
                          target: verifyStmt.title || verifyStmt.signature,
                        })
                      }
                    })
                  }
                }
              })
            }

            // Extract test actions
            const actions = []
            if (sub.nested_elements) {
              sub.nested_elements.forEach(nested => {
                if (nested.kind && (nested.kind.includes('Action') || nested.kind.includes('action'))) {
                  actions.push({
                    name: nested.title,
                    kind: nested.kind,
                    description: nested.doc_comment || (nested.doc_declarations?.[0]?.[1]) || '',
                  })
                }
              })
            }

            verifList.push({
              ...sub,
              packageName: chapter.title,
              objectives,
              actions,
            })
          }
        })
      }
    })
    return verifList
  }, [documentation])

  // Extract use cases (test scenarios)
  const useCases = useMemo(() => {
    if (!documentation || !documentation.chapters) return []

    const caseList = []
    documentation.chapters.forEach(chapter => {
      if (chapter.subchapters) {
        chapter.subchapters.forEach(sub => {
          if (sub.kind && (sub.kind.includes('UseCase') || sub.kind.includes('use case'))) {
            caseList.push({
              ...sub,
              packageName: chapter.title,
            })
          }
        })
      }
    })
    return caseList
  }, [documentation])

  // Extract assertions with validation status
  const assertions = useMemo(() => {
    if (!documentation || !documentation.chapters) return []

    const assertList = []
    documentation.chapters.forEach(chapter => {
      if (chapter.subchapters) {
        chapter.subchapters.forEach(sub => {
          if (sub.nested_elements) {
            sub.nested_elements.forEach(nested => {
              if (nested.kind && nested.kind.includes('Assert')) {
                // Validate assertion: check if it has a constraint
                const hasConstraint = nested.nested_elements && nested.nested_elements.some(el =>
                  el.kind && el.kind.toLowerCase().includes('constraint')
                )
                const isValid = hasConstraint || (nested.signature && nested.signature.includes('constraint'))

                assertList.push({
                  ...nested,
                  parentName: sub.title,
                  packageName: chapter.title,
                  isValid,
                  validationMessage: isValid ? 'Has constraint' : 'Missing constraint definition'
                })
              }
            })
          }
        })
      }
    })
    return assertList
  }, [documentation])

  // Extract requirements being verified
  const requirements = useMemo(() => {
    if (!documentation || !documentation.chapters) return []

    const reqList = []
    documentation.chapters.forEach(chapter => {
      if (chapter.subchapters) {
        chapter.subchapters.forEach(sub => {
          // Only include actual requirement definitions/usages, not satisfy/verify relationships
          if (sub.kind && sub.kind.includes('Requirement')) {
            // Exclude SatisfyRequirementUsage and VerifyRequirementUsage
            if (!sub.kind.includes('SatisfyRequirement') && !sub.kind.includes('VerifyRequirement')) {
              reqList.push({
                ...sub,
                packageName: chapter.title,
              })
            }
          }
        })
      }
    })
    return reqList
  }, [documentation])

  // Extract verify relationships from documentation
  const verifyRelationships = useMemo(() => {
    if (!documentation || !documentation.chapters) return []

    const verify = []
    documentation.chapters.forEach(chapter => {
      if (chapter.subchapters) {
        chapter.subchapters.forEach(sub => {
          // Check for Verify elements (standalone verify statements like "verify req by test")
          if (sub.kind && (sub.kind === '[VerifyRequirementUsage]' || sub.kind.toLowerCase().includes('verifyrequirementusage'))) {
            // Extract from title or signature
            const titleMatch = sub.title?.match(/verify\s+(\w+)\s+by\s+(\w+)/i)
            if (titleMatch) {
              verify.push({
                requirement: titleMatch[1],
                verification: titleMatch[2],
                source: 'standalone',
              })
            } else if (sub.signature) {
              const sigMatch = sub.signature.match(/verify\s+(\w+)\s+by\s+(\w+)/i)
              if (sigMatch) {
                verify.push({
                  requirement: sigMatch[1],
                  verification: sigMatch[2],
                  source: 'standalone',
                })
              }
            }
          }
        })
      }
    })

    // Also extract from objective blocks within verifications
    verifications.forEach(verif => {
      verif.objectives?.forEach(obj => {
        if (obj.type === 'verify') {
          // Extract requirement name from "verify requirementName"
          const match = obj.target.match(/verify\s+(\w+)/i)
          if (match) {
            verify.push({
              requirement: match[1],
              verification: verif.title,
              source: 'objective',
            })
          }
        }
      })
    })

    return verify
  }, [documentation, verifications])

  // Calculate test coverage using actual verify relationships with smart matching
  const testCoverage = useMemo(() => {
    const totalReqs = requirements.length
    if (totalReqs === 0) return { percentage: 0, verifiedCount: 0, total: totalReqs }

    // Smart matching function to correlate definitions and usages
    const checkMatch = (relName, reqTitle) => {
      if (relName === reqTitle) return true
      // Check if requirement definition matches usage (e.g., OverVoltageProtectionReq <-> overVoltageProtection)
      const reqLower = reqTitle.toLowerCase().replace('req', '')
      const relLower = relName.toLowerCase().replace('req', '')
      return reqLower === relLower ||
             reqLower.includes(relLower) ||
             relLower.includes(reqLower)
    }

    // Count how many requirements have verification links
    let verifiedCount = 0
    requirements.forEach(req => {
      const isVerified = verifyRelationships.some(rel => checkMatch(rel.requirement, req.title))
      if (isVerified) verifiedCount++
    })

    return {
      percentage: (verifiedCount / totalReqs) * 100,
      verifiedCount,
      total: totalReqs,
    }
  }, [requirements, verifyRelationships])

  if (docLoading || analyticsLoading) {
    return (
      <div className="testing-view">
        <div className="testing-loading">Extracting test cases from code...</div>
      </div>
    )
  }

  if (!code || code.trim().length === 0) {
    return (
      <div className="testing-view">
        <div className="testing-empty">
          Write SysML v2 test cases in the editor to see live extraction and analysis.
        </div>
      </div>
    )
  }

  return (
    <div className="testing-view">
      <div className="testing-header">
        <h3>Test Analysis</h3>
        <div className="testing-stats">
          <span className="test-stat">
            <strong>{verifications.length}</strong> Tests
          </span>
          <span className="test-stat">
            <strong>{assertions.length}</strong> Assertions
          </span>
          <span className="test-stat">
            <strong>{verifyRelationships.length}</strong> Links
          </span>
          <span className="test-stat">
            <strong>{testCoverage.percentage.toFixed(0)}%</strong> Coverage
          </span>
        </div>
      </div>

      <div className="testing-tabs">
        <button
          className={`test-tab ${activeTab === 'verifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('verifications')}
        >
          Test Cases
        </button>
        <button
          className={`test-tab ${activeTab === 'assertions' ? 'active' : ''}`}
          onClick={() => setActiveTab('assertions')}
        >
          Assertions
        </button>
        <button
          className={`test-tab ${activeTab === 'scenarios' ? 'active' : ''}`}
          onClick={() => setActiveTab('scenarios')}
        >
          Scenarios
        </button>
        <button
          className={`test-tab ${activeTab === 'coverage' ? 'active' : ''}`}
          onClick={() => setActiveTab('coverage')}
        >
          Coverage
        </button>
      </div>

      <div className="testing-content">
        {activeTab === 'verifications' && (
          <div className="verifications-list">
            {verifications.length > 0 ? (
              verifications.map((verif, index) => (
                <SpotlightCard key={index}>
                  <div className="verification-item">
                    <div className="verification-header">
                      <span className="verification-badge">{verif.kind}</span>
                      <h4 className="verification-title">{verif.title}</h4>
                    </div>
                    <div className="verification-package">
                      Package: <code>{verif.packageName}</code>
                    </div>
                    {verif.doc_comment && (
                      <div className="verification-doc">{verif.doc_comment}</div>
                    )}
                    {verif.doc_declarations && verif.doc_declarations.length > 0 && (
                      <div className="verification-doc">
                        {verif.doc_declarations.map((decl, i) => (
                          <div key={i}>{decl[1]}</div>
                        ))}
                      </div>
                    )}
                    {verif.objectives && verif.objectives.length > 0 && (
                      <div className="verification-objectives">
                        <strong>Objectives:</strong>
                        <ul>
                          {verif.objectives.map((obj, i) => (
                            <li key={i}>
                              <code>{obj.target}</code> ({obj.type})
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {verif.actions && verif.actions.length > 0 && (
                      <div className="verification-actions">
                        <strong>Test Steps:</strong>
                        <ul>
                          {verif.actions.map((action, i) => (
                            <li key={i}>
                              <code>{action.name}</code> - {action.description}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </SpotlightCard>
              ))
            ) : (
              <div className="testing-empty">
                No test cases found. Define verifications using <code>verification def</code> syntax.
              </div>
            )}
          </div>
        )}

        {activeTab === 'assertions' && (
          <div className="assertions-list">
            {assertions.length > 0 ? (
              assertions.map((assertion, index) => (
                <SpotlightCard key={index}>
                  <div className="assertion-item">
                    <div className="assertion-header">
                      <span className="assertion-badge">{assertion.kind}</span>
                      <h4 className="assertion-title">{assertion.title}</h4>
                      <span className={`assertion-validation-badge ${assertion.isValid ? 'valid' : 'invalid'}`}>
                        {assertion.isValid ? '✓ Valid' : '✗ Invalid'}
                      </span>
                    </div>
                    <div className="assertion-context">
                      Test: <code>{assertion.parentName}</code>
                      <span className="assertion-validation-message">
                        {assertion.validationMessage}
                      </span>
                    </div>
                    {assertion.doc_comment && (
                      <div className="assertion-doc">{assertion.doc_comment}</div>
                    )}
                    {assertion.doc_declarations && assertion.doc_declarations.length > 0 && (
                      <div className="assertion-doc">
                        {assertion.doc_declarations.map((decl, i) => (
                          <div key={i}>{decl[1]}</div>
                        ))}
                      </div>
                    )}
                    {assertion.signature && (
                      <div className="assertion-signature">
                        <code>{assertion.signature}</code>
                      </div>
                    )}
                  </div>
                </SpotlightCard>
              ))
            ) : (
              <div className="testing-empty">
                No assertions found. Add <code>assert</code> statements to verification cases.
              </div>
            )}
          </div>
        )}

        {activeTab === 'scenarios' && (
          <div className="scenarios-list">
            {useCases.length > 0 ? (
              useCases.map((useCase, index) => (
                <SpotlightCard key={index}>
                  <div className="scenario-item">
                    <div className="scenario-header">
                      <span className="scenario-badge">{useCase.kind}</span>
                      <h4 className="scenario-title">{useCase.title}</h4>
                    </div>
                    {useCase.doc_comment && (
                      <div className="scenario-doc">{useCase.doc_comment}</div>
                    )}
                    {useCase.doc_declarations && useCase.doc_declarations.length > 0 && (
                      <div className="scenario-doc">
                        {useCase.doc_declarations.map((decl, i) => (
                          <div key={i}>{decl[1]}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </SpotlightCard>
              ))
            ) : (
              <div className="testing-empty">
                No test scenarios found. Define scenarios using <code>use case</code> syntax.
              </div>
            )}
          </div>
        )}

        {activeTab === 'coverage' && (
          <div className="coverage-view">
            <div className="coverage-metrics">
              <SpotlightCard>
                <div className="coverage-metric">
                  <div className="coverage-label">Requirements</div>
                  <div className="coverage-value">{requirements.length}</div>
                </div>
              </SpotlightCard>
              <SpotlightCard>
                <div className="coverage-metric">
                  <div className="coverage-label">Verifications</div>
                  <div className="coverage-value">{verifications.length}</div>
                </div>
              </SpotlightCard>
              <SpotlightCard>
                <div className="coverage-metric">
                  <div className="coverage-label">Assertions</div>
                  <div className="coverage-value">{assertions.length}</div>
                </div>
              </SpotlightCard>
              <SpotlightCard>
                <div className="coverage-metric">
                  <div className="coverage-label">Test Coverage</div>
                  <div className="coverage-value coverage-value-large">{testCoverage.percentage.toFixed(0)}%</div>
                </div>
              </SpotlightCard>
            </div>
            <div className="coverage-details">
              <h4>Verification Coverage</h4>
              <div className="coverage-bar">
                <div
                  className="coverage-bar-fill"
                  style={{ width: `${testCoverage.percentage}%` }}
                >
                  <span className="coverage-bar-text">
                    {testCoverage.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
              <p className="coverage-note">
                {testCoverage.verifiedCount} of {testCoverage.total} requirements have verification links
              </p>
              <div style={{ marginTop: '1.5rem' }}>
                <h5>Verification Sources</h5>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
                  <div className="coverage-source">
                    <div className="coverage-source-label">Standalone verify statements</div>
                    <div className="coverage-source-value">
                      {verifyRelationships.filter(r => r.source === 'standalone').length}
                    </div>
                  </div>
                  <div className="coverage-source">
                    <div className="coverage-source-label">Objective blocks</div>
                    <div className="coverage-source-value">
                      {verifyRelationships.filter(r => r.source === 'objective').length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
