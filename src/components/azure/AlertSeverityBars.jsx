const SEVERITY_DATA = [
  { label: 'Sev0 — Critical', cls: 'red',    pct: 92,  val: 141 },
  { label: 'Sev1 — High',    cls: 'orange',  pct: 95,  val: 146 },
  { label: 'Sev2 — Medium',  cls: 'yellow',  pct: 17,  val: 26  },
  { label: 'Sev3 — Low',     cls: '',        pct: 100, val: 154 },
  { label: 'Sev4 — Info',    cls: 'grey',    pct: 51,  val: 78  },
]

const VM_PILLARS = [
  { label: '🖥️  CPU',     cls: 'orange', pct: 100, val: 72 },
  { label: '💽  Disk',    cls: 'teal',   pct: 83,  val: 60 },
  { label: '🧠  Memory',  cls: 'purple', pct: 85,  val: 61 },
  { label: '❤️  Up/Down', cls: 'red',    pct: 97,  val: 70 },
]

export default function AlertSeverityBars() {
  return (
    <div className="two-col">
      <div className="section">
        <h2>Alert Rules by Severity</h2>
        {SEVERITY_DATA.map((r) => (
          <div key={r.label} className="bar-row">
            <div className="bar-label">{r.label}</div>
            <div className="bar-track">
              <div className={`bar-fill${r.cls ? ' ' + r.cls : ''}`} style={{ width: r.pct + '%' }} />
            </div>
            <div className="bar-val">{r.val}</div>
          </div>
        ))}
        <p className="section-note">Sev0 = page immediately &nbsp;|&nbsp; Sev4 = audit / health events</p>
      </div>

      <div className="section">
        <h2>VM Monitoring &mdash; 4 Pillars (All Vertex Products)</h2>
        {VM_PILLARS.map((r) => (
          <div key={r.label} className="bar-row">
            <div className="bar-label">{r.label}</div>
            <div className="bar-track">
              <div className={`bar-fill${r.cls ? ' ' + r.cls : ''}`} style={{ width: r.pct + '%' }} />
            </div>
            <div className="bar-val">{r.val}</div>
          </div>
        ))}
        <p className="section-note">Disk = Log Analytics (requires DCR agent on VM) &nbsp;|&nbsp; Up/Down = Activity Log (no agent needed)</p>
      </div>
    </div>
  )
}
