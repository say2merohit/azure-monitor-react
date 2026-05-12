const ROWS = [
  { name: 'VXretail',     env: 'Prod / Dev / Test/QA', cpu: ['sev0'],       disk: ['sev0'],       mem: ['sev0'],       updown: ['sev0','sev2'] },
  { name: 'VXexchange',   env: 'Prod / Dev / Test/QA', cpu: ['sev0'],       disk: ['sev0'],       mem: ['sev0'],       updown: ['sev0','sev2'] },
  { name: 'VXenterprise', env: 'Prod / Dev / Test/QA', cpu: ['sev0'],       disk: ['sev0'],       mem: ['sev0'],       updown: ['sev0','sev2'] },
  { name: 'VXengage',     env: 'Prod / Dev / Test/QA', cpu: ['sev0'],       disk: ['sev0'],       mem: ['sev0'],       updown: ['sev0','sev2'] },
  { name: 'VXcis',        env: 'Prod / Dev / Test/QA', cpu: ['sev0'],       disk: ['sev0'],       mem: ['sev0'],       updown: ['sev0','sev2'] },
  { name: 'VXbanner/GNG', env: 'Prod / Dev / Test/QA', cpu: ['sev0'],       disk: ['sev0'],       mem: ['sev0'],       updown: ['sev0','sev2'] },
  { name: 'VXconnect',    env: 'Prod / Dev / Test/QA', cpu: ['sev0'],       disk: ['sev0'],       mem: ['sev0'],       updown: ['sev0','sev2'] },
  { name: 'VXmeter',      env: 'Prod / Dev / Test/QA', cpu: ['sev0'],       disk: ['sev0'],       mem: ['sev0'],       updown: ['sev0','sev2'] },
  { name: 'Network',      env: 'Prod / Dev',           cpu: ['sev0'],       disk: ['sev0'],       mem: ['sev0'],       updown: ['sev0','sev2'] },
  { name: 'Wintel',       env: 'Prod / Dev',           cpu: ['sev0'],       disk: ['sev0'],       mem: ['sev0'],       updown: ['sev0','sev2'] },
  { name: 'SaskPower',    env: 'Prod / Dev / Test/QA', cpu: ['sev0'],       disk: ['sev1'],       mem: ['sev1'],       updown: ['sev0','sev2'] },
  { name: 'InfoSec',      env: 'Prod',                 cpu: ['sev0'],       disk: ['sev0'],       mem: ['sev0'],       updown: ['sev0']        },
  { name: 'Dynamics 365', env: '',                     cpu: ['sev1'],       disk: ['sev1'],       mem: ['sev1'],       updown: ['sev0']        },
]

function Pills({ sevs }) {
  return (
    <td style={{ textAlign: 'center' }}>
      {sevs.map((s, i) => (
        <span key={i} className={`pill pill-${s}`} style={{ marginRight: i < sevs.length - 1 ? 3 : 0 }}>
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </span>
      ))}
    </td>
  )
}

export default function ProductMatrix() {
  return (
    <div className="section">
      <h2>Product Coverage Matrix &mdash; CPU / Disk / Memory / Up-Down</h2>
      <div className="callout warn" style={{ marginBottom: 14 }}>
        <strong>⚠️ Disk alerts depend on the VM being DCR-attached.</strong>
        Each VM must have the AMA agent installed and be linked to a DCR that forwards Perf data to a Log Analytics workspace.
        If the VM is not attached, disk utilisation data never reaches the workspace and the alert rule will not fire &mdash;
        even if the rule exists. The workspace tags shown on each product card identify which DCR is feeding that product.
      </div>
      <table className="matrix">
        <thead>
          <tr>
            <th style={{ width: '28%' }}>Product / Team</th>
            <th style={{ textAlign: 'center', width: '14%' }}>🖥️ CPU</th>
            <th style={{ textAlign: 'center', width: '14%' }}>💽 Disk</th>
            <th style={{ textAlign: 'center', width: '14%' }}>🧠 Memory</th>
            <th style={{ textAlign: 'center', width: '16%' }}>❤️ Up/Down</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.name}>
              <td>
                <strong>{r.name}</strong>
                {r.env && <br />}
                {r.env && <span style={{ fontSize: '.75rem', color: '#605e5c' }}>{r.env}</span>}
              </td>
              <Pills sevs={r.cpu} />
              <Pills sevs={r.disk} />
              <Pills sevs={r.mem} />
              <Pills sevs={r.updown} />
            </tr>
          ))}
        </tbody>
      </table>
      <p className="section-note" style={{ marginTop: 10 }}>
        Click any product card below to expand and see every individual alert rule name, threshold, and data source.
      </p>
    </div>
  )
}
