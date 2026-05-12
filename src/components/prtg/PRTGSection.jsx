import { useState, useMemo } from 'react'
import prtgSensors from '../../data/prtg_sensors.json'
import FilterBar from '../common/FilterBar'
import SensorTable from './SensorTable'

const CATEGORIES = [
  { id: 'Products-Plano-DC',        label: 'Products — Plano Databank DC',  icon: '💾', color: '#e05800' },
  { id: 'SLC-Data-Center',          label: 'SLC Data Center',               icon: '🏘️', color: '#0078d4' },
  { id: 'Azure-Cloud-Environments', label: 'Azure Cloud Environments',      icon: '☁️', color: '#0078d4' },
  { id: 'Firewalls-Security',       label: 'Firewalls & Security',          icon: '🛡️', color: '#d13438' },
  { id: 'Customer-Remote-Sites',    label: 'Customer & Remote Sites',       icon: '🌍', color: '#5c2d91' },
  { id: 'PRTG-System',              label: 'PRTG System & Testing',         icon: '👨‍💻', color: '#8a8886' },
]

const STATUS_OPTIONS = ['All', 'up', 'warning', 'paused', 'down']

function getUniqueTypes(sensors) {
  const types = new Set(sensors.map((s) => s.stype))
  return ['All', ...Array.from(types).sort()]
}

function getUniqueGroups(sensors) {
  const groups = new Set(sensors.map((s) => s.group))
  return ['All', ...Array.from(groups).sort()]
}

function CatKpi({ total, up, warn, paused, down }) {
  return (
    <div className="cat-kpi-row">
      <div className="cat-kpi"><div className="ck-num">{total}</div><div className="ck-label">Total</div></div>
      <div className="cat-kpi ck-up"><div className="ck-num">{up}</div><div className="ck-label">Up</div></div>
      <div className="cat-kpi ck-warn"><div className="ck-num">{warn}</div><div className="ck-label">Warning</div></div>
      <div className="cat-kpi ck-paused"><div className="ck-num">{paused}</div><div className="ck-label">Paused</div></div>
      {down > 0 && <div className="cat-kpi ck-down"><div className="ck-num">{down}</div><div className="ck-label">Down</div></div>}
    </div>
  )
}

function CategoryBlock({ catId, label, icon, color }) {
  const [filterType, setFilterType] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')
  const [filterGroup, setFilterGroup] = useState('All')

  const catSensors = useMemo(() => prtgSensors.filter((s) => s.category === catId), [catId])
  const typeOptions = useMemo(() => getUniqueTypes(catSensors), [catSensors])
  const groupOptions = useMemo(() => getUniqueGroups(catSensors), [catSensors])
  const hasMultipleGroups = groupOptions.length > 2  // 'All' + at least 2 actual groups

  const counts = useMemo(() => ({
    total: catSensors.length,
    up: catSensors.filter((s) => s.status === 'up').length,
    warn: catSensors.filter((s) => s.status === 'warning').length,
    paused: catSensors.filter((s) => s.status === 'paused').length,
    down: catSensors.filter((s) => s.status === 'down').length,
  }), [catSensors])

  return (
    <div className="cat-block" style={{ borderLeftColor: color }}>
      <div className="cat-block-title" style={{ color }}>
        <span>{icon}</span> {label}
      </div>
      <div className="cat-block-sub">{counts.total} sensors</div>

      <CatKpi {...counts} />

      <FilterBar
        label="Type:"
        options={typeOptions}
        active={filterType}
        onChange={setFilterType}
      />
      <FilterBar
        label="Status:"
        options={STATUS_OPTIONS}
        active={filterStatus}
        onChange={setFilterStatus}
      />
      {hasMultipleGroups && (
        <FilterBar
          label="Group:"
          options={groupOptions}
          active={filterGroup}
          onChange={setFilterGroup}
        />
      )}

      <SensorTable
        sensors={catSensors}
        filterType={filterType}
        filterStatus={filterStatus}
        filterGroup={filterGroup}
        hideGroupCol={!hasMultipleGroups}
      />
    </div>
  )
}

export default function PRTGSection() {
  const totals = useMemo(() => ({
    total: prtgSensors.length,
    up: prtgSensors.filter((s) => s.status === 'up').length,
    warn: prtgSensors.filter((s) => s.status === 'warning').length,
    paused: prtgSensors.filter((s) => s.status === 'paused').length,
    down: prtgSensors.filter((s) => s.status === 'down').length,
  }), [])

  return (
    <div className="prtg-section">
      <div className="prtg-section-title">PRTG Network Monitor</div>
      <div className="prtg-section-sub">Real-time sensor monitoring across all Vertex infrastructure</div>

      <div className="prtg-global-kpi">
        <div className="pgk"><div className="pgk-num">{totals.total}</div><div className="pgk-lbl">Total</div></div>
        <div className="pgk up"><div className="pgk-num">{totals.up}</div><div className="pgk-lbl">Up</div></div>
        <div className="pgk warn"><div className="pgk-num">{totals.warn}</div><div className="pgk-lbl">Warning</div></div>
        <div className="pgk paused"><div className="pgk-num">{totals.paused}</div><div className="pgk-lbl">Paused</div></div>
        {totals.down > 0 && <div className="pgk down"><div className="pgk-num">{totals.down}</div><div className="pgk-lbl">Down</div></div>}
      </div>

      {CATEGORIES.map((cat) => (
        <CategoryBlock
          key={cat.id}
          catId={cat.id}
          label={cat.label}
          icon={cat.icon}
          color={cat.color}
        />
      ))}
    </div>
  )
}
