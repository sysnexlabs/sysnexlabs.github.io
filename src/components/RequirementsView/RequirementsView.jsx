import React, { useState, useMemo } from 'react'
import { useSysMLDocumentation } from '../../hooks/useSysMLWasm'
import { useSysMLAnalytics } from '../../hooks/useSysMLAnalytics'
import SpotlightCard from '../SpotlightCard'
import TraceabilityGraph from './TraceabilityGraph'
import './RequirementsView.css'

/**
 * Requirements View Component
 *
 * Extracts and displays requirements from SysML v2 code using WASM
 */
export default function RequirementsView({ code }) {
  const { documentation, loading: docLoading } = useSysMLDocumentation(code, 'editor://current')
  const { analytics, loading: analyticsLoading } = useSysMLAnalytics(code, 'editor://current')
  const [activeTab, setActiveTab] = useState('requirements')

  // Extract requirements from documentation (excluding satisfy/verify relationship nodes)
  const requirements = useMemo(() => {
    if (!documentation || !documentation.chapters) return []

    const reqList = []
    documentation.chapters.forEach(chapter => {
      if (chapter.subchapters) {
        chapter.subchapters.forEach(sub => {
          // Only include actual requirement definitions/usages, not satisfy/verify relationships
          if (sub.kind && (sub.kind.includes('Requirement') || sub.kind.includes('requirement'))) {
            // Exclude SatisfyRequirementUsage and VerifyRequirementUsage
            if (!sub.kind.includes('SatisfyRequirement') && !sub.kind.includes('VerifyRequirement')) {
              reqList.push({
                ...sub,
                packageName: chapter.title,
                packageKind: chapter.kind,
              })
            }
          }
        })
      }
    })
    return reqList
  }, [documentation])

  // Extract verifications from documentation
  const verifications = useMemo(() => {
    if (!documentation || !documentation.chapters) return []

    const verifList = []
    documentation.chapters.forEach(chapter => {
      if (chapter.subchapters) {
        chapter.subchapters.forEach(sub => {
          if (sub.kind && (sub.kind.includes('Verification') || sub.kind.includes('verification'))) {
            verifList.push({
              ...sub,
              packageName: chapter.title,
            })
          }
        })
      }
    })
    return verifList
  }, [documentation])

  // Extract satisfy and verify relationships
  const relationships = useMemo(() => {
    if (!documentation || !documentation.chapters) return { satisfy: [], verify: [] }

    const satisfy = []
    const verify = []

    documentation.chapters.forEach(chapter => {
      if (chapter.subchapters) {
        chapter.subchapters.forEach(sub => {
          // Check for Satisfy elements (these are statements like "satisfy req by impl")
          if (sub.kind && (sub.kind.toLowerCase().includes('satisfy') || sub.kind === '[SatisfyRequirementUsage]')) {
            // Extract from title or signature
            // Title format: "satisfy vehicleSafety by testVehicle"
            const titleMatch = sub.title?.match(/satisfy\s+(\w+)\s+by\s+(\w+)/i)
            if (titleMatch) {
              satisfy.push({
                from: titleMatch[2], // implementation
                to: titleMatch[1],   // requirement
                kind: 'Satisfy',
              })
            } else if (sub.signature) {
              // Try to extract from signature
              const sigMatch = sub.signature.match(/satisfy\s+(\w+)\s+by\s+(\w+)/i)
              if (sigMatch) {
                satisfy.push({
                  from: sigMatch[2],
                  to: sigMatch[1],
                  kind: 'Satisfy',
                })
              }
            }
          }

          // Check for Verify elements (standalone verify statements like "verify req by test")
          if (sub.kind && (sub.kind === '[VerifyRequirementUsage]' || sub.kind.toLowerCase().includes('verifyrequirementusage'))) {
            // Extract from title or signature
            const titleMatch = sub.title?.match(/verify\s+(\w+)\s+by\s+(\w+)/i)
            if (titleMatch) {
              verify.push({
                from: titleMatch[2], // verification
                to: titleMatch[1],   // requirement
                kind: 'Verify',
              })
            } else if (sub.signature) {
              // Try to extract from signature
              const sigMatch = sub.signature.match(/verify\s+(\w+)\s+by\s+(\w+)/i)
              if (sigMatch) {
                verify.push({
                  from: sigMatch[2], // verification
                  to: sigMatch[1],   // requirement
                  kind: 'Verify',
                })
              }
            }
          }

          // Check for Verify relationships in verification definitions
          if (sub.kind && sub.kind.toLowerCase().includes('verification')) {
            // Look in nested elements for verify statements in objective blocks
            if (sub.nested_elements) {
              sub.nested_elements.forEach(nested => {
                // Check for objective blocks
                if (nested.kind && nested.kind.toLowerCase().includes('objective')) {
                  // Look for verify statements in objective
                  if (nested.nested_elements) {
                    nested.nested_elements.forEach(obj => {
                      if (obj.kind && obj.kind.toLowerCase().includes('verify')) {
                        verify.push({
                          from: sub.title,
                          to: obj.title || obj.signature || 'Unknown',
                          kind: 'Verify',
                        })
                      }
                    })
                  }
                } else if (nested.kind && nested.kind.toLowerCase().includes('verify')) {
                  // Direct verify statement
                  verify.push({
                    from: sub.title,
                    to: nested.title || nested.signature || 'Unknown',
                    kind: 'Verify',
                  })
                }
              })
            }

            // Also check for relationships array
            if (sub.relationships && sub.relationships.length > 0) {
              sub.relationships.forEach(rel => {
                if (rel.kind && rel.kind.toLowerCase().includes('verify')) {
                  verify.push({
                    from: sub.title,
                    to: rel.target || rel.target_name || 'Unknown',
                    kind: 'Verify',
                  })
                }
              })
            }
          }

          // Also check relationships array for satisfy
          if (sub.relationships && sub.relationships.length > 0) {
            sub.relationships.forEach(rel => {
              if (rel.kind && rel.kind.toLowerCase().includes('satisfy')) {
                satisfy.push({
                  from: sub.title,
                  to: rel.target || rel.target_name || 'Unknown',
                  kind: 'Satisfy',
                })
              }
            })
          }
        })
      }
    })

    return { satisfy, verify }
  }, [documentation])

  // Calculate coverage metrics with smart name matching
  const coverageMetrics = useMemo(() => {
    const totalReqs = requirements.length
    if (totalReqs === 0) return { verified: 0, satisfied: 0, total: 0 }

    // Smart matching function to correlate definitions and usages
    const checkMatch = (relName, reqTitle) => {
      if (relName === reqTitle) return true
      // Check if requirement definition matches usage (e.g., VehicleSafetyReq <-> vehicleSafety)
      const reqLower = reqTitle.toLowerCase().replace('req', '')
      const relLower = relName.toLowerCase().replace('req', '')
      return reqLower === relLower ||
             reqLower.includes(relLower) ||
             relLower.includes(reqLower)
    }

    // Count how many requirements have verification links
    let verifiedCount = 0
    requirements.forEach(req => {
      const isVerified = relationships.verify.some(rel => checkMatch(rel.to, req.title))
      if (isVerified) verifiedCount++
    })

    // Count how many requirements have satisfaction links
    let satisfiedCount = 0
    requirements.forEach(req => {
      const isSatisfied = relationships.satisfy.some(rel => checkMatch(rel.to, req.title))
      if (isSatisfied) satisfiedCount++
    })

    return {
      verified: (verifiedCount / totalReqs) * 100,
      satisfied: (satisfiedCount / totalReqs) * 100,
      total: totalReqs,
      verifiedCount: verifiedCount,
      satisfiedCount: satisfiedCount
    }
  }, [requirements, relationships])

  if (docLoading || analyticsLoading) {
    return (
      <div className="requirements-view">
        <div className="requirements-loading">Extracting requirements from code...</div>
      </div>
    )
  }

  if (!code || code.trim().length === 0) {
    return (
      <div className="requirements-view">
        <div className="requirements-empty">
          Write SysML v2 requirements in the editor to see live extraction and analysis.
        </div>
      </div>
    )
  }

  return (
    <div className="requirements-view">
      <div className="requirements-header">
        <h3>Requirements Analysis</h3>
        {analytics && analytics.metrics && (
          <div className="requirements-stats">
            <span className="req-stat">
              <strong>{requirements.length}</strong> Requirements
            </span>
            <span className="req-stat">
              <strong>{verifications.length}</strong> Verifications
            </span>
            <span className="req-stat">
              <strong>{relationships.satisfy.length + relationships.verify.length}</strong> Links
            </span>
          </div>
        )}
      </div>

      <div className="requirements-tabs">
        <button
          className={`req-tab ${activeTab === 'requirements' ? 'active' : ''}`}
          onClick={() => setActiveTab('requirements')}
        >
          Requirements
        </button>
        <button
          className={`req-tab ${activeTab === 'verifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('verifications')}
        >
          Verifications
        </button>
        <button
          className={`req-tab ${activeTab === 'traceability' ? 'active' : ''}`}
          onClick={() => setActiveTab('traceability')}
        >
          Traceability
        </button>
        <button
          className={`req-tab ${activeTab === 'graph' ? 'active' : ''}`}
          onClick={() => setActiveTab('graph')}
        >
          Graph
        </button>
        <button
          className={`req-tab ${activeTab === 'coverage' ? 'active' : ''}`}
          onClick={() => setActiveTab('coverage')}
        >
          Coverage
        </button>
      </div>

      <div className="requirements-content">
        {activeTab === 'requirements' && (
          <div className="requirements-list">
            {requirements.length > 0 ? (
              <div className="requirements-table-container">
                <table className="requirements-table">
                  <thead>
                    <tr>
                      <th>Requirement</th>
                      <th>Type</th>
                      <th>Package</th>
                      <th>Description</th>
                      <th>Trace Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requirements.map((req, index) => {
                      // Check if this requirement is satisfied/verified
                      // Match both exact title and variations (e.g., "VehicleSafetyReq" matches "vehicleSafety")
                      const checkMatch = (relName) => {
                        if (relName === req.title) return true;
                        // Check if requirement definition matches usage (e.g., VehicleSafetyReq <-> vehicleSafety)
                        const reqLower = req.title.toLowerCase().replace('req', '');
                        const relLower = relName.toLowerCase().replace('req', '');
                        return reqLower === relLower ||
                               reqLower.includes(relLower) ||
                               relLower.includes(reqLower);
                      };

                      const isSatisfied = relationships.satisfy.some(rel => checkMatch(rel.to));
                      const isVerified = relationships.verify.some(rel => checkMatch(rel.to));
                      const status = isSatisfied && isVerified ? 'Complete' :
                                     isSatisfied ? 'Satisfied' :
                                     isVerified ? 'Verified' : 'Pending';

                      return (
                        <tr key={index} className={`req-row status-${status.toLowerCase()}`}>
                          <td className="req-title">
                            <strong>{req.title}</strong>
                          </td>
                          <td className="req-type">
                            <span className="type-badge">{req.kind.replace(/[\[\]]/g, '')}</span>
                          </td>
                          <td className="req-package">
                            <code>{req.packageName}</code>
                          </td>
                          <td className="req-description">
                            {req.doc_comment || (req.doc_declarations && req.doc_declarations.length > 0
                              ? req.doc_declarations[0][1]
                              : 'No description')}
                          </td>
                          <td className="req-status">
                            <span className={`status-badge status-${status.toLowerCase()}`}>
                              {status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="requirements-empty">
                No requirements found. Define requirements using <code>requirement def</code> syntax.
              </div>
            )}
          </div>
        )}

        {activeTab === 'verifications' && (
          <div className="verifications-list">
            {verifications.length > 0 ? (
              verifications.map((verif, index) => (
                <SpotlightCard key={index}>
                  <div className="verification-item">
                    <div className="verification-header">
                      <span className="verification-kind">{verif.kind}</span>
                      <h4 className="verification-title">{verif.title}</h4>
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
                  </div>
                </SpotlightCard>
              ))
            ) : (
              <div className="verifications-empty">
                No verifications found. Define verification cases using <code>verification def</code> syntax.
              </div>
            )}
          </div>
        )}

        {activeTab === 'traceability' && (
          <div className="traceability-view">
            <h4>Traceability Matrix</h4>
            <p className="traceability-description">
              Bidirectional traceability showing relationships between requirements, implementations, and verifications.
            </p>

            {(relationships.satisfy.length > 0 || relationships.verify.length > 0) ? (
              <div className="traceability-table-container">
                <table className="traceability-table">
                  <thead>
                    <tr>
                      <th>Source Element</th>
                      <th>Relationship</th>
                      <th>Target Requirement</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {relationships.satisfy.map((rel, index) => (
                      <tr key={`sat-${index}`} className="trace-row satisfy-row">
                        <td className="trace-source">{rel.from}</td>
                        <td className="trace-relationship">
                          <span className="relationship-badge satisfy">satisfies</span>
                        </td>
                        <td className="trace-target">{rel.to}</td>
                        <td className="trace-type">Implementation</td>
                      </tr>
                    ))}
                    {relationships.verify.map((rel, index) => (
                      <tr key={`ver-${index}`} className="trace-row verify-row">
                        <td className="trace-source">{rel.from}</td>
                        <td className="trace-relationship">
                          <span className="relationship-badge verify">verifies</span>
                        </td>
                        <td className="trace-target">{rel.to}</td>
                        <td className="trace-type">Verification</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="traceability-empty">
                <p>No traceability links found.</p>
                <ul>
                  <li>Use <code>satisfy requirement by implementation</code> to trace implementations</li>
                  <li>Use <code>verify requirement</code> in verification definitions</li>
                </ul>
              </div>
            )}

            <div className="traceability-summary">
              <div className="summary-card">
                <span className="summary-value">{relationships.satisfy.length}</span>
                <span className="summary-label">Satisfaction Links</span>
              </div>
              <div className="summary-card">
                <span className="summary-value">{relationships.verify.length}</span>
                <span className="summary-label">Verification Links</span>
              </div>
              <div className="summary-card">
                <span className="summary-value">{relationships.satisfy.length + relationships.verify.length}</span>
                <span className="summary-label">Total Traces</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'coverage' && (
          <div className="coverage-view">
            <h4>Requirements Coverage Analysis</h4>

            <div className="coverage-stats">
              <SpotlightCard>
                <div className="coverage-metric">
                  <div className="coverage-label">Requirements Defined</div>
                  <div className="coverage-value">{requirements.length}</div>
                </div>
              </SpotlightCard>
              <SpotlightCard>
                <div className="coverage-metric">
                  <div className="coverage-label">Verifications Defined</div>
                  <div className="coverage-value">{verifications.length}</div>
                </div>
              </SpotlightCard>
              <SpotlightCard>
                <div className="coverage-metric">
                  <div className="coverage-label">Satisfy Links</div>
                  <div className="coverage-value">{relationships.satisfy.length}</div>
                </div>
              </SpotlightCard>
              <SpotlightCard>
                <div className="coverage-metric">
                  <div className="coverage-label">Verify Links</div>
                  <div className="coverage-value">{relationships.verify.length}</div>
                </div>
              </SpotlightCard>
            </div>

            <div className="coverage-progress-section">
              <div className="coverage-detail">
                <div className="coverage-detail-header">
                  <h5>Verification Coverage</h5>
                  <span className="coverage-percentage">{coverageMetrics.verified.toFixed(1)}%</span>
                </div>
                <div className="coverage-bar">
                  <div
                    className="coverage-bar-fill verify"
                    style={{ width: `${coverageMetrics.verified}%` }}
                  />
                </div>
                <div className="coverage-info">
                  {coverageMetrics.verifiedCount} of {coverageMetrics.total} requirements have verification links
                </div>
              </div>

              <div className="coverage-detail">
                <div className="coverage-detail-header">
                  <h5>Satisfaction Coverage</h5>
                  <span className="coverage-percentage">{coverageMetrics.satisfied.toFixed(1)}%</span>
                </div>
                <div className="coverage-bar">
                  <div
                    className="coverage-bar-fill satisfy"
                    style={{ width: `${coverageMetrics.satisfied}%` }}
                  />
                </div>
                <div className="coverage-info">
                  {coverageMetrics.satisfiedCount} of {coverageMetrics.total} requirements have satisfaction links
                </div>
              </div>

              {analytics && analytics.metrics && analytics.metrics.doc_coverage && (
                <div className="coverage-detail">
                  <div className="coverage-detail-header">
                    <h5>Documentation Coverage</h5>
                    <span className="coverage-percentage">{analytics.metrics.doc_coverage.toFixed(1)}%</span>
                  </div>
                  <div className="coverage-bar">
                    <div
                      className="coverage-bar-fill doc"
                      style={{ width: `${analytics.metrics.doc_coverage}%` }}
                    />
                  </div>
                  <div className="coverage-info">
                    Elements with documentation comments
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'graph' && (
          <div className="graph-view">
            <h4>Traceability Graph Visualization</h4>
            <p className="graph-description">
              Visual representation of requirements traceability. Implementations (left) satisfy requirements (center),
              while verifications (right) verify requirements.
            </p>
            <TraceabilityGraph
              requirements={requirements}
              relationships={relationships}
              verifications={verifications}
            />
          </div>
        )}
      </div>
    </div>
  )
}
