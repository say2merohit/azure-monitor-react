import { useState } from 'react'

const PRODUCTS = [
  {
    id: 'VXretail',
    name: 'VXretail',
    env: 'Prod / Dev / Test/QA',
    pillars: [
      { icon: '🖥️', label: 'CPU',     sev: 'sev0', cls: 'p-sev0' },
      { icon: '💽', label: 'Disk',    sev: 'Sev0', cls: 'p-sev0' },
      { icon: '🧠', label: 'Memory',  sev: 'Sev0', cls: 'p-sev0' },
      { icon: '❤️', label: 'Up/Down', sev: 'Sev0 / Sev2', cls: 'p-sev0' },
    ],
    badges: ['badge-app-perf:📊 App Performance', 'badge-gw:🌐 App Gateway', 'badge-svc-health:🏥 Service Health', 'badge-appsvc:🚀 App Service'],
    ws: 'laws-vxexch-retail-ct-01 (24 VMs) · laws-VXexch-retail-DCR-01 (42 VMs) · vtx-eci-laws-01 (47 VMs) · vtx-prod-wrkspce-la-01 (13 VMs)',
  },
  {
    id: 'VXexchange',
    name: 'VXexchange',
    env: 'Prod / Dev / Test/QA',
    pillars: [
      { icon: '🖥️', label: 'CPU',     sev: 'Sev0', cls: 'p-sev0' },
      { icon: '💽', label: 'Disk',    sev: 'Sev0', cls: 'p-sev0' },
      { icon: '🧠', label: 'Memory',  sev: 'Sev0', cls: 'p-sev0' },
      { icon: '❤️', label: 'Up/Down', sev: 'Sev0 / Sev2', cls: 'p-sev0' },
    ],
    badges: ['badge-app-perf:📊 App Performance', 'badge-gw:🌐 App Gateway', 'badge-svc-health:🏥 Service Health'],
    ws: 'laws-vxexch-retail-ct-01 (24 VMs) · laws-VXexch-retail-DCR-01 (42 VMs) · vtx-eci-laws-01 (47 VMs)',
  },
  {
    id: 'VXenterprise',
    name: 'VXenterprise',
    env: 'Prod / Dev / Test/QA',
    pillars: [
      { icon: '🖥️', label: 'CPU',     sev: 'Sev0', cls: 'p-sev0' },
      { icon: '💽', label: 'Disk',    sev: 'Sev0', cls: 'p-sev0' },
      { icon: '🧠', label: 'Memory',  sev: 'Sev0', cls: 'p-sev0' },
      { icon: '❤️', label: 'Up/Down', sev: 'Sev0 / Sev2', cls: 'p-sev0' },
    ],
    badges: ['badge-app-perf:📊 App Performance', 'badge-gw:🌐 App Gateway', 'badge-svc-health:🏥 Service Health'],
    ws: 'vtx-eci-laws-01 (47 VMs) · vtx-prod-wrkspce-la-01 (13 VMs)',
  },
  {
    id: 'VXengage',
    name: 'VXengage',
    env: 'Prod / Dev / Test/QA',
    pillars: [
      { icon: '🖥️', label: 'CPU',     sev: 'Sev0', cls: 'p-sev0' },
      { icon: '💽', label: 'Disk',    sev: 'Sev0', cls: 'p-sev0' },
      { icon: '🧠', label: 'Memory',  sev: 'Sev0', cls: 'p-sev0' },
      { icon: '❤️', label: 'Up/Down', sev: 'Sev0 / Sev2', cls: 'p-sev0' },
    ],
    badges: ['badge-app-perf:📊 App Performance', 'badge-aks:⎈ AKS', 'badge-svc-health:🏥 Service Health', 'badge-appsvc:🚀 App Service'],
    ws: 'laws-engage-01 · laws-engage-dev-01 · vtx-prod-wrkspce-la-01',
  },
  {
    id: 'VXcis',
    name: 'VXcis',
    env: 'Prod / Dev / Test/QA',
    pillars: [
      { icon: '🖥️', label: 'CPU',     sev: 'Sev0', cls: 'p-sev0' },
      { icon: '💽', label: 'Disk',    sev: 'Sev0', cls: 'p-sev0' },
      { icon: '🧠', label: 'Memory',  sev: 'Sev0', cls: 'p-sev0' },
      { icon: '❤️', label: 'Up/Down', sev: 'Sev0 / Sev2', cls: 'p-sev0' },
    ],
    badges: ['badge-app-perf:📊 App Performance', 'badge-db:🗄️ DB', 'badge-svc-health:🏥 Service Health'],
    ws: 'vtx-eci-laws-01 · vtx-prod-wrkspce-la-01',
  },
  {
    id: 'VXbanner',
    name: 'VXbanner / GNG',
    env: 'Prod / Dev / Test/QA',
    pillars: [
      { icon: '🖥️', label: 'CPU',     sev: 'Sev0', cls: 'p-sev0' },
      { icon: '💽', label: 'Disk',    sev: 'Sev0', cls: 'p-sev0' },
      { icon: '🧠', label: 'Memory',  sev: 'Sev0', cls: 'p-sev0' },
      { icon: '❤️', label: 'Up/Down', sev: 'Sev0 / Sev2', cls: 'p-sev0' },
    ],
    badges: ['badge-app-perf:📊 App Performance', 'badge-svc-health:🏥 Service Health'],
    ws: 'laws-gng-prod-01 · vtx-prod-wrkspce-la-01',
  },
  {
    id: 'VXconnect',
    name: 'VXconnect',
    env: 'Prod / Dev / Test/QA',
    pillars: [
      { icon: '🖥️', label: 'CPU',     sev: 'Sev0', cls: 'p-sev0' },
      { icon: '💽', label: 'Disk',    sev: 'Sev0', cls: 'p-sev0' },
      { icon: '🧠', label: 'Memory',  sev: 'Sev0', cls: 'p-sev0' },
      { icon: '❤️', label: 'Up/Down', sev: 'Sev0 / Sev2', cls: 'p-sev0' },
    ],
    badges: ['badge-app-perf:📊 App Performance', 'badge-svc-health:🏥 Service Health'],
    ws: 'vtx-prod-wrkspce-la-01',
  },
  {
    id: 'VXmeter',
    name: 'VXmeter',
    env: 'Prod / Dev / Test/QA',
    pillars: [
      { icon: '🖥️', label: 'CPU',     sev: 'Sev0', cls: 'p-sev0' },
      { icon: '💽', label: 'Disk',    sev: 'Sev0', cls: 'p-sev0' },
      { icon: '🧠', label: 'Memory',  sev: 'Sev0', cls: 'p-sev0' },
      { icon: '❤️', label: 'Up/Down', sev: 'Sev0 / Sev2', cls: 'p-sev0' },
    ],
    badges: ['badge-svc-health:🏥 Service Health'],
    ws: 'vtx-prod-wrkspce-la-01',
  },
  {
    id: 'Network',
    name: 'Network',
    env: 'Prod / Dev',
    pillars: [
      { icon: '🖥️', label: 'CPU',     sev: 'Sev0', cls: 'p-sev0' },
      { icon: '💽', label: 'Disk',    sev: 'Sev0', cls: 'p-sev0' },
      { icon: '🧠', label: 'Memory',  sev: 'Sev0', cls: 'p-sev0' },
      { icon: '❤️', label: 'Up/Down', sev: 'Sev0 / Sev2', cls: 'p-sev0' },
    ],
    badges: ['badge-gw:🌐 App Gateway', 'badge-svc-health:🏥 Service Health'],
    ws: 'vtx-prod-wrkspce-la-01',
  },
  {
    id: 'Wintel',
    name: 'Wintel',
    env: 'Prod / Dev',
    pillars: [
      { icon: '🖥️', label: 'CPU',     sev: 'Sev0', cls: 'p-sev0' },
      { icon: '💽', label: 'Disk',    sev: 'Sev0', cls: 'p-sev0' },
      { icon: '🧠', label: 'Memory',  sev: 'Sev0', cls: 'p-sev0' },
      { icon: '❤️', label: 'Up/Down', sev: 'Sev0 / Sev2', cls: 'p-sev0' },
    ],
    badges: ['badge-svc-health:🏥 Service Health'],
    ws: 'vtx-prod-wrkspce-la-01',
  },
  {
    id: 'SaskPower',
    name: 'SaskPower',
    env: 'Prod / Dev / Test/QA',
    pillars: [
      { icon: '🖥️', label: 'CPU',     sev: 'Sev0', cls: 'p-sev0' },
      { icon: '💽', label: 'Disk',    sev: 'Sev1', cls: 'p-sev1' },
      { icon: '🧠', label: 'Memory',  sev: 'Sev1', cls: 'p-sev1' },
      { icon: '❤️', label: 'Up/Down', sev: 'Sev0 / Sev2', cls: 'p-sev0' },
    ],
    badges: ['badge-svc-health:🏥 Service Health'],
    ws: 'vtx-prod-wrkspce-la-01',
  },
  {
    id: 'InfoSec',
    name: 'InfoSec',
    env: 'Prod',
    pillars: [
      { icon: '🖥️', label: 'CPU',     sev: 'Sev0', cls: 'p-sev0' },
      { icon: '💽', label: 'Disk',    sev: 'Sev0', cls: 'p-sev0' },
      { icon: '🧠', label: 'Memory',  sev: 'Sev0', cls: 'p-sev0' },
      { icon: '❤️', label: 'Up/Down', sev: 'Sev0', cls: 'p-sev0' },
    ],
    badges: ['badge-svc-health:🏥 Service Health'],
    ws: 'vtx-prod-wrkspce-la-01',
  },
  {
    id: 'Dynamics365',
    name: 'Dynamics 365',
    env: '',
    pillars: [
      { icon: '🖥️', label: 'CPU',     sev: 'Sev1', cls: 'p-sev1' },
      { icon: '💽', label: 'Disk',    sev: 'Sev1', cls: 'p-sev1' },
      { icon: '🧠', label: 'Memory',  sev: 'Sev1', cls: 'p-sev1' },
      { icon: '❤️', label: 'Up/Down', sev: 'Sev0', cls: 'p-sev0' },
    ],
    badges: ['badge-svc-health:🏥 Service Health'],
    ws: 'vtx-prod-wrkspce-la-01',
  },
]

function ProductCard({ product }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="prod-card">
      <div className="prod-header" onClick={() => setOpen(!open)}>
        <div className="prod-title">
          <span className="prod-name">{product.name}</span>
          {product.env && <span className="env-tag">{product.env}</span>}
        </div>
        <span className={`prod-chevron${open ? ' open' : ''}`}>▼</span>
      </div>

      <table className="pillar-table">
        <tbody>
          <tr>
            {product.pillars.map((p, i) => (
              <td key={i} className={`p-cell ${p.cls}`}>
                <div className="p-icon">{p.icon}</div>
                <div className="p-label">{p.label}</div>
                <div className="p-count">{p.sev}</div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      {product.badges && product.badges.length > 0 && (
        <div className="addl-row">
          <span style={{ fontSize: '.78rem', color: '#605e5c', marginRight: 4 }}>Also:</span>
          {product.badges.map((b, i) => {
            const [cls, label] = b.split(':')
            return <span key={i} className={`badge ${cls}`}>{label}</span>
          })}
        </div>
      )}

      {product.ws && (
        <div className="ws-row">
          📊 <strong>Log Analytics (DCR-fed):</strong>
          {product.ws.split('·').map((w, i) => (
            <span key={i} className="ws-tag">{w.trim()}</span>
          ))}
        </div>
      )}

      {open && (
        <div className="prod-detail">
          <p style={{ fontSize: '.83rem', color: '#605e5c' }}>
            Expand this card in the full HTML report for individual alert rule details, VM resource lists, and workspace configurations.
            This React dashboard shows the product coverage summary; full alert rule tables are available in the source report.
          </p>
        </div>
      )}
    </div>
  )
}

export default function ProductCards() {
  return (
    <div className="section">
      <h2>Per-Product Alert Detail &mdash; click any card to expand</h2>
      {PRODUCTS.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}
