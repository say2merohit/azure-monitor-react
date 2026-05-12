import { useMemo } from 'react'
import StatusPill from '../common/StatusPill'

export default function SensorTable({ sensors, filterType, filterStatus, filterGroup, hideGroupCol }) {
  const filtered = useMemo(() => {
    return sensors.filter((s) => {
      if (filterType && filterType !== 'All' && s.stype !== filterType) return false
      if (filterStatus && filterStatus !== 'All' && s.status !== filterStatus) return false
      if (filterGroup && filterGroup !== 'All' && s.group !== filterGroup) return false
      return true
    })
  }, [sensors, filterType, filterStatus, filterGroup])

  if (filtered.length === 0) {
    return <p style={{ fontSize: '.82rem', color: '#8a8886', marginTop: 8 }}>No sensors match the current filters.</p>
  }

  return (
    <>
      <table className="sensor-tbl">
        <thead>
          <tr>
            {!hideGroupCol && <th>Group</th>}
            <th>Device</th>
            <th>Sensor</th>
            <th>Type</th>
            <th>Status</th>
            <th>Last Value</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((s, i) => (
            <tr key={i}>
              {!hideGroupCol && <td style={{ fontSize: '.74rem', color: '#605e5c' }}>{s.group}</td>}
              <td style={{ fontWeight: 500 }}>{s.device}</td>
              <td>{s.sensor}</td>
              <td><span style={{ fontSize: '.73rem', background: '#f3f2f1', padding: '2px 6px', borderRadius: 4 }}>{s.stype}</span></td>
              <td><StatusPill status={s.status} /></td>
              <td style={{ fontSize: '.75rem', color: '#605e5c' }}>{s.last_val}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="table-count">{filtered.length} sensor{filtered.length !== 1 ? 's' : ''} shown</p>
    </>
  )
}
