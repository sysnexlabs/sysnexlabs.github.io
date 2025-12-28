import React, { useMemo, useState } from "react";

/**
 * SysNex – Hero Page Mock (React + CSS)
 * - Single-file component you can drop into any React app.
 * - Includes a built-in light/dark toggle.
 * - Replace placeholder images with your assets.
 */
export default function HeroPageMock() {
  const [theme, setTheme] = useState("dark");
  const isDark = theme === "dark";

  const styles = useMemo(
    () => `
    :root {
      /* Brand (from our guidelines) */
      --navy: #0B1F3A;
      --navy-2: #123A63;
      --offwhite: #F6F8FB;
      --white: #FFFFFF;
      --text: #2E3440;
      --muted: #6B7280;
      --border: #D1D5DB;
      --cyan: #00B4D8;
      --aubergine: #4B1E4D;
      --warn: #F59E0B;

      /* Dark theme */
      --d-bg: #0A1628;
      --d-surface: #0F2747;
      --d-surface-2: #16335B;
      --d-text: #E6EBF2;
      --d-muted: #B6C0D0;
      --d-muted-2: #7E8AA3;

      /* Layout */
      --radius: 18px;
      --radius-lg: 26px;
      --shadow: 0 12px 40px rgba(0,0,0,0.18);
      --shadow-soft: 0 10px 24px rgba(0,0,0,0.12);
      --max: 1180px;
    }

    * { box-sizing: border-box; }
    html, body { height: 100%; }
    body { margin: 0; font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; }

    .page {
      min-height: 100vh;
      color: ${isDark ? "var(--d-text)" : "var(--text)"};
      background:
        radial-gradient(900px 420px at 18% 18%, ${isDark ? "rgba(0,180,216,0.18)" : "rgba(0,180,216,0.10)"}, transparent 60%),
        radial-gradient(820px 360px at 86% 20%, ${isDark ? "rgba(92,42,100,0.16)" : "rgba(75,30,77,0.10)"}, transparent 58%),
        linear-gradient(180deg, ${isDark ? "#081021" : "#FFFFFF"} 0%, ${isDark ? "#0A1628" : "#F6F8FB"} 60%, ${isDark ? "#081021" : "#FFFFFF"} 100%);
    }

    .container { width: min(var(--max), calc(100% - 48px)); margin: 0 auto; }

    /* Top nav */
    .nav {
      position: sticky;
      top: 0;
      z-index: 10;
      backdrop-filter: blur(12px);
      background: ${isDark ? "rgba(10,22,40,0.70)" : "rgba(255,255,255,0.72)"};
      border-bottom: 1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(11,31,58,0.10)"};
    }

    .navInner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 0;
      gap: 16px;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: inherit;
    }

    .logoMark {
      width: 38px;
      height: 38px;
      border-radius: 12px;
      display: grid;
      place-items: center;
      background: ${isDark ? "rgba(255,255,255,0.06)" : "rgba(11,31,58,0.06)"};
      border: 1px solid ${isDark ? "rgba(255,255,255,0.10)" : "rgba(11,31,58,0.10)"};
    }

    .logoMark svg { 
      width: 22px; 
      height: 22px; 
      display: block;
    }

    .brandText { display: flex; flex-direction: column; line-height: 1.1; }
    .brandText strong { font-size: 14px; letter-spacing: 0.2px; }
    .brandText span { font-size: 12px; opacity: 0.75; }

    .navLinks { display: flex; align-items: center; gap: 14px; }
    .navLinks a {
      font-size: 13px;
      text-decoration: none;
      color: ${isDark ? "var(--d-muted)" : "var(--muted)"};
      padding: 8px 10px;
      border-radius: 12px;
      transition: background 160ms ease, color 160ms ease;
    }
    .navLinks a:hover {
      background: ${isDark ? "rgba(255,255,255,0.06)" : "rgba(11,31,58,0.06)"};
      color: ${isDark ? "var(--d-text)" : "var(--text)"};
    }

    .navActions { display: flex; align-items: center; gap: 10px; }

    .pill {
      border: 1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(11,31,58,0.14)"};
      background: ${isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.70)"};
      padding: 8px 12px;
      border-radius: 999px;
      font-size: 13px;
      color: ${isDark ? "var(--d-text)" : "var(--text)"};
      cursor: pointer;
      transition: transform 120ms ease, background 160ms ease;
      box-shadow: ${isDark ? "none" : "0 6px 18px rgba(11,31,58,0.06)"};
    }
    .pill:hover { transform: translateY(-1px); }

    .cta {
      border: none;
      background: linear-gradient(135deg, var(--cyan), rgba(0,180,216,0.70));
      color: #021523;
      font-weight: 700;
      padding: 10px 14px;
      border-radius: 14px;
      cursor: pointer;
      box-shadow: 0 10px 22px rgba(0,180,216,0.25);
      transition: transform 120ms ease, filter 160ms ease;
      font-size: 13px;
      white-space: nowrap;
    }
    .cta:hover { transform: translateY(-1px); filter: brightness(1.02); }

    /* Hero */
    .hero {
      padding: 56px 0 54px;
    }

    .grid {
      display: grid;
      grid-template-columns: 1.12fr 0.88fr;
      gap: 28px;
      align-items: center;
    }

    @media (max-width: 980px) {
      .grid { grid-template-columns: 1fr; }
    }

    .kicker {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 8px 12px;
      border-radius: 999px;
      border: 1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(11,31,58,0.12)"};
      background: ${isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.80)"};
      color: ${isDark ? "var(--d-muted)" : "var(--muted)"};
      font-size: 13px;
      width: fit-content;
    }

    .dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: var(--cyan);
      box-shadow: 0 0 0 6px rgba(0,180,216,0.16);
    }

    h1 {
      margin: 14px 0 10px;
      font-size: clamp(36px, 4.4vw, 56px);
      line-height: 1.05;
      letter-spacing: -0.02em;
    }

    .sub {
      margin: 0;
      font-size: 16px;
      line-height: 1.65;
      color: ${isDark ? "var(--d-muted)" : "var(--muted)"};
      max-width: 60ch;
    }

    .heroActions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 18px;
      align-items: center;
    }

    .btnPrimary {
      border: none;
      background: linear-gradient(135deg, var(--cyan), rgba(0,180,216,0.72));
      color: #021523;
      font-weight: 800;
      padding: 12px 16px;
      border-radius: 16px;
      cursor: pointer;
      box-shadow: 0 12px 28px rgba(0,180,216,0.22);
      transition: transform 120ms ease, filter 160ms ease;
    }
    .btnPrimary:hover { transform: translateY(-1px); filter: brightness(1.02); }

    .btnSecondary {
      background: transparent;
      border: 1px solid ${isDark ? "rgba(255,255,255,0.14)" : "rgba(11,31,58,0.14)"};
      color: ${isDark ? "var(--d-text)" : "var(--text)"};
      padding: 12px 16px;
      border-radius: 16px;
      cursor: pointer;
      transition: transform 120ms ease, background 160ms ease;
    }
    .btnSecondary:hover {
      transform: translateY(-1px);
      background: ${isDark ? "rgba(255,255,255,0.06)" : "rgba(11,31,58,0.06)"};
    }

    .trustRow {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 18px;
      color: ${isDark ? "var(--d-muted-2)" : "rgba(46,52,64,0.70)"};
      font-size: 13px;
    }

    .chip {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 10px;
      border-radius: 999px;
      border: 1px solid ${isDark ? "rgba(255,255,255,0.10)" : "rgba(11,31,58,0.10)"};
      background: ${isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.78)"};
    }

    .chip svg { width: 14px; height: 14px; opacity: 0.85; }

    /* Right visual */
    .visual {
      border-radius: var(--radius-lg);
      border: 1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(11,31,58,0.10)"};
      background:
        radial-gradient(600px 240px at 20% 18%, rgba(0,180,216,0.18), transparent 55%),
        radial-gradient(520px 220px at 85% 22%, rgba(92,42,100,0.14), transparent 60%),
        linear-gradient(180deg, ${isDark ? "rgba(255,255,255,0.06)" : "rgba(11,31,58,0.05)"} 0%, ${isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.70)"} 100%);
      box-shadow: ${isDark ? "var(--shadow)" : "var(--shadow-soft)"};
      overflow: hidden;
      min-height: 420px;
      position: relative;
    }

    .visualTop {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 16px;
      border-bottom: 1px solid ${isDark ? "rgba(255,255,255,0.10)" : "rgba(11,31,58,0.10)"};
    }

    .badge {
      font-size: 12px;
      padding: 6px 10px;
      border-radius: 999px;
      border: 1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(11,31,58,0.12)"};
      background: ${isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.75)"};
      color: ${isDark ? "var(--d-muted)" : "var(--muted)"};
    }

    .mini {
      display: flex;
      gap: 8px;
      align-items: center;
      color: ${isDark ? "var(--d-muted)" : "var(--muted)"};
      font-size: 12px;
    }

    .miniDot {
      width: 8px; height: 8px; border-radius: 50%;
      background: rgba(63,185,80,0.95);
      box-shadow: 0 0 0 6px rgba(63,185,80,0.14);
    }

    .visualBody {
      padding: 16px;
      display: grid;
      gap: 12px;
    }

    .card {
      border-radius: 18px;
      border: 1px solid ${isDark ? "rgba(255,255,255,0.10)" : "rgba(11,31,58,0.10)"};
      background: ${isDark ? "rgba(10,22,40,0.55)" : "rgba(255,255,255,0.78)"};
      padding: 14px;
      display: grid;
      gap: 10px;
    }

    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }

    .label { font-size: 12px; color: ${isDark ? "var(--d-muted-2)" : "rgba(46,52,64,0.75)"}; }
    .value { font-size: 13px; color: ${isDark ? "var(--d-text)" : "var(--text)"}; font-weight: 700; }

    .bar {
      height: 10px;
      border-radius: 999px;
      background: ${isDark ? "rgba(255,255,255,0.08)" : "rgba(11,31,58,0.10)"};
      overflow: hidden;
    }

    .bar > div {
      height: 100%;
      border-radius: 999px;
      background: linear-gradient(90deg, var(--cyan), rgba(0,180,216,0.55));
      width: 72%;
    }

    .foot {
      padding: 14px 16px;
      border-top: 1px solid ${isDark ? "rgba(255,255,255,0.10)" : "rgba(11,31,58,0.10)"};
      display: flex;
      gap: 10px;
      align-items: center;
      justify-content: space-between;
      color: ${isDark ? "var(--d-muted)" : "var(--muted)"};
      font-size: 12px;
    }

    .pillSmall {
      border: 1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(11,31,58,0.12)"};
      background: ${isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.75)"};
      padding: 6px 10px;
      border-radius: 999px;
      white-space: nowrap;
    }

    /* Footer strip */
    .strip {
      padding: 22px 0 44px;
    }

    .stripInner {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }

    @media (max-width: 980px) {
      .stripInner { grid-template-columns: 1fr 1fr; }
    }

    @media (max-width: 560px) {
      .stripInner { grid-template-columns: 1fr; }
    }

    .metric {
      border-radius: 18px;
      border: 1px solid ${isDark ? "rgba(255,255,255,0.10)" : "rgba(11,31,58,0.10)"};
      background: ${isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.78)"};
      padding: 18px;
      text-align: center;
    }

    .metricValue {
      font-size: 28px;
      font-weight: 800;
      color: var(--cyan);
      margin-bottom: 6px;
      line-height: 1;
    }

    .metricLabel {
      font-size: 12px;
      color: ${isDark ? "var(--d-muted-2)" : "var(--muted)"};
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    @media (max-width: 768px) {
      .navLinks { display: none; }
      .hero { padding: 32px 0 40px; }
      .grid { gap: 24px; }
      h1 { font-size: clamp(28px, 6vw, 42px); }
      .sub { font-size: 15px; }
      .visual { min-height: 320px; }
    }
  `,
    [isDark]
  );

  return (
    <>
      <style>{styles}</style>
      <div className="page">
        {/* Navigation */}
        <nav className="nav">
          <div className="container">
            <div className="navInner">
              <a href="#" className="brand">
                <div className="logoMark">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Upper S: Systems Engineering */}
                    <path
                      d="M5.5 7.8c0-2 1.8-3.6 4-3.6h9"
                      stroke={isDark ? "#E6EBF2" : "#2E3440"}
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                    {/* Connection: Tooling / Flow */}
                    <path
                      d="M6.5 12h11"
                      stroke="#00B4D8"
                      strokeWidth="2.0"
                      strokeLinecap="round"
                    />
                    {/* Lower S: Software Engineering */}
                    <path
                      d="M18.5 16.2c0 2-1.8 3.6-4 3.6h-9"
                      stroke={isDark ? "#E6EBF2" : "#2E3440"}
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="brandText">
                  <strong>SysNex</strong>
                  <span>Systems</span>
                </div>
              </a>
              <div className="navLinks">
                <a href="#">Product</a>
                <a href="#">Solutions</a>
                <a href="#">Resources</a>
                <a href="#">About</a>
              </div>
              <div className="navActions">
                <button
                  className="pill"
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                >
                  {isDark ? "☀️" : "🌙"}
                </button>
                <button className="cta">Get Started</button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <div className="grid">
              <div>
                <div className="kicker">
                  <span className="dot"></span>
                  <span>Enterprise SysML v2 Tooling</span>
                </div>
                <h1>
                  Syscribe: SysML v2 Platform for Modern Systems Engineering
                </h1>
                <p className="sub">
                  Syscribe delivers production-ready SysML v2 Language Server technology with VS Code integration, AI assistance, and compliance variants. Built for OEM/Tier-1 teams who demand performance, reliability, and regulatory compliance.
                </p>
                <div className="heroActions">
                  <button className="btnPrimary">Get Started</button>
                  <button className="btnSecondary">View Features</button>
                </div>
                <div className="trustRow">
                  <div className="chip">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>50M+ VS Code Users</span>
                  </div>
                  <div className="chip">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>&lt;50ms LSP Response</span>
                  </div>
                  <div className="chip">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>18/18 LSP Features</span>
                  </div>
                </div>
              </div>

              <div className="visual">
                <div className="visualTop">
                  <div className="badge">Syscribe IDE</div>
                  <div className="mini">
                    <span className="miniDot"></span>
                    <span>Live</span>
                  </div>
                </div>
                <div className="visualBody">
                  <div className="card">
                    <div className="row">
                      <span className="label">Performance</span>
                      <span className="value">&lt;50ms</span>
                    </div>
                    <div className="bar">
                      <div></div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="row">
                      <span className="label">LSP Compliance</span>
                      <span className="value">18/18</span>
                    </div>
                    <div className="bar">
                      <div style={{ width: "100%" }}></div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="row">
                      <span className="label">VS Code Users</span>
                      <span className="value">50M+</span>
                    </div>
                    <div className="bar">
                      <div style={{ width: "85%" }}></div>
                    </div>
                  </div>
                </div>
                <div className="foot">
                  <span>Production Ready</span>
                  <div className="pillSmall">v1.0.0</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Metrics Strip */}
        <section className="strip">
          <div className="container">
            <div className="stripInner">
              <div className="metric">
                <div className="metricValue">50M+</div>
                <div className="metricLabel">VS Code Users</div>
              </div>
              <div className="metric">
                <div className="metricValue">&lt;50ms</div>
                <div className="metricLabel">LSP Response</div>
              </div>
              <div className="metric">
                <div className="metricValue">18/18</div>
                <div className="metricLabel">LSP Features</div>
              </div>
              <div className="metric">
                <div className="metricValue">3</div>
                <div className="metricLabel">Platform Variants</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
