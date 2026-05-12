import { useState, useMemo } from 'react'
import urMonitors from '../../data/uptimerobot.json'
import FilterBar from '../common/FilterBar'
import StatusPill from '../common/StatusPill'

const PRODUCTS = [
  'All',
  'VXengage',
  'VXretail / VXexchange',
  'VXcis',
  'GNG',
  'VXconnect',
  'VXenterprise',
  'Customer Portals',
  'Infrastructure / Other',
]

const STATUSES = ['All', 'up', 'down', 'paused']

export default function UptimeRobotSection() {
  const [filterProduct, setFilterProduct] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')

  const filtered = useMemo(() => {
    return urMonitors.filter((m) => {
      if (filterProduct !== 'All' && m.product !== filterProduct) return false
      if (filterStatus !== 'All' && m.status !== filterStatus) return false
      return true
    })
  }, [filterProduct, filterStatus])

  const totals = useMemo(() => ({
    total: urMonitors.length,
    up: urMonitors.filter((m) => m.status === 'up').length,
    down: urMonitors.filter((m) => m.status === 'down').length,
    paused: urMonitors.filter((m) => m.status === 'paused').length,
  }), [])

  return (
    <div className="ur-section">
      <div className="prtg-section-title">UptimeRobot</div>
      <div className="prtg-section-sub">URL and endpoint monitoring for all Vertex products</div>

      <div className="prtg-global-kpi">
        <div className="pgk"><div className="pgk-num">{totals.total}</div><div className="pgk-lbl">Total</div></div>
        <div className="pgk up"><div className="pgk-num">{totals.up}</div><div className="pgk-lbl">Up</div></div>
        <div className="pgk down"><div className="pgk-num">{totals.down}</div><div className="pgk-lbl">Down</div></div>
        <div className="pgk paused"><div className="pgk-num">{totals.paused}</div><div className="pgk-lbl">Paused</div></div>
      </div>

      <FilterBar
        label="Product:"
        options={PRODUCTS}
        active={filterProduct}
        onChange={setFilterProduct}
      />
      <FilterBar
        label="Status:"
        options={STATUSES}
        active={filterStatus}
        onChange={setFilterStatus}
      />

      <table className="ur-tbl">
        <thead>
          <tr>
            <th>Product</th>
            <th>Name</th>
            <th>URL</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((m) => (
            <tr key={m.id}>
              <td style={{ fontSize: '.75rem', color: '#605e5c', whiteSpace: 'nowrap' }}>{m.product}</td>
              <td style={{ fontWeight: 500 }}>{m.name}</td>
              <td>
                <a
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '.75rem', fontFamily: 'Consolas,monospace', wordBreak: 'break-all' }}
                >
                  {m.url}
                </a>
              </td>
              <td><StatusPill status={m.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="table-count">{filtered.length} monitor{filtered.length !== 1 ? 's' : ''} shown</p>
    </div>
  )
}
